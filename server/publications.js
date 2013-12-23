/**
 * Created by mindestens on 12/14/13.
 */
// TODO: delete if switched to shareRelations
/*Meteor.publish('offers', function () {
  // check if the user is logged in
  if (this.userId) {
    // return offers which the logged in user is permitted to view:
    // - owns the offer
    // - the offer has been shared with him
    return Offers.find(
      {$or: [
        {sharedWith: this.userId},
        {ownerId: this.userId}
      ]}
    );
  } else {
    // return no offers
    return Offers.find(null);
  }
});*/

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
    var visibleOffers = [];
    var shareRelations = ShareRelations.find({receiverId: this.userId});
    if (shareRelations.count()) {
      shareRelations.forEach(function (shareRelation) {
        if (shareRelation.accepted) {
          if (visibleOffers.indexOf(shareRelation.offerId) === -1) {
            visibleOffers.push(shareRelation.offerId);
          }
        }
      });
    }

    return Offers.find({_id:  { $in: visibleOffers } });
  } else {
    // return no offers
    return Offers.find(null);
  }
});

// publish all user profiles which the user has a connection to (named as knownUsers)
Meteor.publish("directory", function () {
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
});

Meteor.publish('shareRelations', function() {
  return ShareRelations.find(
    {$or: [
      {issuerId: this.userId},
      {receiverId: this.userId}
    ]}
  );
});