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

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {'username': 1}});
});
