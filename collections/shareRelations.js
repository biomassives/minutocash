/**
 * Created by mindestens on 12/23/13.
 */
ShareRelations = new Meteor.Collection('shareRelations');

ShareRelations.allow({
  // TODO: check if this function is okay.
  update: function (userId, doc) {
    return doc && ( doc.receiverId === userId || doc.issuerId === userId);
  },
  remove: ownsDocument
});

Meteor.methods({
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

    // get the most appropriate username, an offerwith a secure fallback
    var issuerName = user.username;
    if (user.profile && user.profile.name) {
      issuerName = user.profile.name;
    }
    var receiverName = receiver.username;
    if (receiver.profile && receiver.profile.name) {
      receiverName = receiver.profile.name;
    }

    var offerText = offer.firstname + " " + offer.lastname;

    shareRelation = _.extend(_.pick(shareRelationAttributes, 'offerId'), {
      offerText: offerText,
      issuerId: user._id,
      issuerName: issuerName,
      receiverId: receiver._id,
      receiverName: receiverName,
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
  }
});