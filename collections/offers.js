/**
 * Created by mindestens on 12/13/13.
 */
Offers = new Meteor.Collection('offers');

Offers.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Offers.deny({
  update: function (userId, offer, fieldNames) {
    // TODO: check if all fields are not empty and not too long if an offer gets edited

    // may only edit the following fields (must be all fields which are being displayed by the form!):
    return (_.without(fieldNames, 'firstname', 'lastname', 'phone', 'content').length > 0);
  }
});

Meteor.methods({
  createOffer: function (offerAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create a new offer");
    }

    // ensure the offer has a firstname
    if (!offerAttributes.firstname) {
      throw new Meteor.Error(422, 'Please fill in a first name');
    }
    // ensure the offers firstname is not too long
    if (offerAttributes.firstname.length > 50) {
      throw new Meteor.Error(422, 'First name is too long');
    }

    // ensure the offer has a lastname
    if (!offerAttributes.lastname) {
      throw new Meteor.Error(422, 'Please fill in a last name');
    }
    // ensure the offers lastname is not too long
    if (offerAttributes.lastname.length > 50) {
      throw new Meteor.Error(422, 'Last name is too long');
    }

    // ensure the offer has a phone numer
    if (!offerAttributes.phone) {
      throw new Meteor.Error(422, 'Please fill in a phone numer');
    }
    // ensure the offers phone number is not too long
    if (offerAttributes.phone.length > 50) {
      throw new Meteor.Error(422, 'Phone number is too long');
    }

    // ensure the offer has a content
    if (!offerAttributes.content) {
      throw new Meteor.Error(422, 'Please fill in a content');
    }
    // ensure the offers content is not too long
    if (offerAttributes.content.length > 2000) {
      throw new Meteor.Error(422, 'Offer is too long');
    }

    // pick out the whitelisted keys
    var offer = _.extend(_.pick(offerAttributes, 'firstname', 'lastname', 'phone', 'content'), {
      // set meta properties
      ownerId: user._id,
      created: new Date().getTime(),
      // set additional properties
      sharedWith: []
    });

    var offerId = Offers.insert(offer);

    return offerId;
  },
  shareRelation: function (shareRelationAttributes, userName) {
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
      issuerId: user._id,
      // FIXME: backup var if no profile name exists?
      issuerName: user.profile.name,
      receiverId: receiver._id,
      // FIXME: backup var if no profile name exists?
      receiverName: receiver.profile.name,
      accepted: false,
      submitted: new Date().getTime()
    });

    // more error checking: check if the same shareRelation (offerId && receiverId) already exist
    if (ShareRelations.findOne({ $and: [{offerId: shareRelation.offerId}, {receiverId: shareRelation.receiverId}]})) {
      throw new Meteor.Error(422, "Already shared to this user");
    }

    return ShareRelations.insert(shareRelation);
  }
});