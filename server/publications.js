/**
 * Created by mindestens on 12/14/13.
 */
Meteor.publish('offers', function () {
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
});

// publish all user profiles which any of the offers have been shared to
Meteor.publish("directory", function () {
  // check if the user is logged in
  if (this.userId) {
    // return users which the logged in user is permitted to view:
    // - users to which he has shared an offer he owns
    var offersOwned = Offers.find({ownerId: this.userId});
    var usersSharedWith = [];
    offersOwned.forEach(function (offer) {
      offer.sharedWith.forEach(function (sharedWith) {
        if (usersSharedWith.indexOf(sharedWith) === -1) {
          usersSharedWith.push(sharedWith);
        }
      });
    });
    return Meteor.users.find({_id: { $in: usersSharedWith } }, {fields: {'username': 1}});
  } else {
    // return no users
    return Meteor.users.find(null);
  }
});