/**
 * Created by mindestens on 12/14/13.
 */
Meteor.publish('offersOwn', function () {
  // check if the user is logged in
  if (this.userId) {
    // return offers which the logged in user is permitted to view:
    // - owns the offer
    // - the offer has been shared with him
    return Offers.find({ownerId: this.userId});
  } else {
    // return no offers
    return Offers.find(null);
  }
});
Meteor.publish('offersShared', function () {
  // check if the user is logged in
  if (this.userId) {
    // initialize helper array
    var visibleOffers = [];
    // initialize all shareRelations which the actual user is the receiver
    var shareRelations = ShareRelations.find({receiverId: this.userId});
    // check if such relations exist
    if (shareRelations.count()) {
      // loop trough all shareRelations and push the offerId to the array if the relation is accepted and the value isn't in the array actually
      shareRelations.forEach(function (shareRelation) {
        if (shareRelation.accepted) {
          if (visibleOffers.indexOf(shareRelation.offerId) === -1) {
            visibleOffers.push(shareRelation.offerId);
          }
        }
      });
    }
    // return offers which contain the _id in the array visibleOffers
    return Offers.find({_id:  { $in: visibleOffers } });
  } else {
    // return no offers
    return Offers.find(null);
  }
});

// LEGACY: with shareRelations not used anymore
// publish all user profiles which the user has a connection to (named as knownUsers)
/*Meteor.publish("directory", function () {
  // check if the user is logged in
  if (this.userId) {
    var knownUsers = [];
    // users to which the user has shared an offer
    var offersOwned = Offers.find({ownerId: this.userId});
    offersOwned.forEach(function (offer) {
      offer.sharedWith.forEach(function (sharedWith) {
        if (knownUsers.indexOf(sharedWith) === -1) {
          knownUsers.push(sharedWith);
        }
      });
    });
    // owners of offers shared to the user
    var offersSharedWith = Offers.find({sharedWith: this.userId});
    offersSharedWith.forEach(function (offer) {
      if (knownUsers.indexOf(offer.ownerId) === -1) {
        knownUsers.push(offer.ownerId);
      }
    });
    return Meteor.users.find({_id: { $in: knownUsers } }, {fields: {'username': 1}});
  } else {
    // return no users
    return Meteor.users.find(null);
  }
});*/

Meteor.publish('shareRelations', function() {
  return ShareRelations.find(
    {$or: [
      {issuerId: this.userId},
      {receiverId: this.userId}
    ]}
  );
});