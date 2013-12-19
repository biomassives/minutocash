/**
 * Created by mindestens on 12/14/13.
 */
Meteor.publish('offers', function() {
  return Offers.find(
    // return only offers which the actual user is the owner of has been invited to view
    // if more OR args are needed use: {$or: [{invited: this.userId}, ... ]}
    {ownerId: this.userId},
    {}
  );
});