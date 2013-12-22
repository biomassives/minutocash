/**
 * Created by mindestens on 12/14/13.
 */
Meteor.publish('offers', function() {
  return Offers.find(
    // return only offers which the actual user is the owner of has been added to the sharedWith array to view
    {$or: [{sharedWith: this.userId}, {ownerId: this.userId} ]},
    {}
  );
});

// publish all user profiles which any of the offers have been shared to
Meteor.publish("directory", function () {
  var offersOwned = Offers.find({ownerId: this.userId});
  var usersSharedWith = [];
  offersOwned.forEach(function (offer) {
    offer.sharedWith.forEach(function (sharedWith) {
      if (usersSharedWith.indexOf(sharedWith) === -1) {
        usersSharedWith.push(sharedWith);
      }
    });
  });
  // test:
  // console.log(usersSharedWith);
  return Meteor.users.find({_id: { $in: usersSharedWith } }, {fields: {'username': 1}});
});
