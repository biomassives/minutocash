/**
 * ======== shareRelations data model ========
 * Each shareRelation is represented by a document in the ShareRelations collection:
 * _id: shareRelation id (String)
 * created: timestamp of the creation date (Number)
 * offerId: id of the related offer (String)
 * offerFirstAndLastname: First name and Last name of the related offer (String) [denormalized]
 * issuerId: id of the issuer (String)
 * issuerName: name of the issuer (String) [denormalized]
 * receiverId: id of the receiver (String)
 * receiverName: name of the receiver (String) [denormalized]
 * accepted: marks if the receiver has accepted this shareRelation (Boolean)
 * ===================================
 */
ShareRelations = new Meteor.Collection('shareRelations');

ShareRelations.allow({
  update: ownsDocument,
  remove: ownsDocument
});

ShareRelations.deny({
  update: function (userId, offer, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'accepted').length > 0);
  }
});

Meteor.methods({
  createShareRelation: function (shareRelationAttributes, userName) {
    var user = Meteor.user();
    var offer = Offers.findOne(shareRelationAttributes.offerId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to share");
    if (!Meteor.users.findOne({username: userName}))
      throw new Meteor.Error(422, "No such user");
    // if the username exists, get the userId
    var receiver = Meteor.users.findOne({username: userName});
    if (user._id === receiver._id)
      throw new Meteor.Error(422, "You can\'t share with yourself");
    if (offer.ownerId === receiver._id)
      throw new Meteor.Error(422, "You can\'t share with the owner of the offer");
    if (!offer)
      throw new Meteor.Error(422, 'You must share an offer');


    shareRelation = _.extend(_.pick(shareRelationAttributes, 'offerId'), {
      offerFirstAndLastname: offer.firstname + " " + offer.lastname,
      issuerId: user._id,
      issuerName: displayName(user),
      receiverId: receiver._id,
      receiverName: displayName(receiver),
      accepted: false,
      submitted: new Date().getTime()
    });

    // more error checking: check if the same shareRelation (offerId && receiverId) already exist
    if (ShareRelations.findOne({ $and: [
      {offerId: shareRelation.offerId},
      {receiverId: shareRelation.receiverId}
    ]})) {
      throw new Meteor.Error(422, "Already shared to this user");
    }

    return ShareRelations.insert(shareRelation);
  },
  // remove all shareRelations with a relation to the to be deleted offer
  removeShareRelationsOnOfferRemove: function (offer) {
    var user = Meteor.user();
    if (!ownsDocument(user._id, offer)) {
      throw new Meteor.Error(422, "You are not the owner of this offer.");
    }
    return ShareRelations.remove({offerId: offer._id});
  },
  // remove a shareRelation as receiver of a shareRelation
  removeShareRelationAsReceiver: function (offer) {
    var user = Meteor.user();
    var currentShareRelation = ShareRelations.findOne({ receiverId: user._id, offerId: offer._id });
    if (!ownsDocument(user._id, currentShareRelation)) {
      throw new Meteor.Error(422, "You can only delete offers from your collection which have been shared to you.");
    }
    return ShareRelations.remove(currentShareRelation._id);
  }
});