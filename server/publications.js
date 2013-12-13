/**
 * Created by mindestens on 12/14/13.
 */
Meteor.publish('offers', function() {
  return Offers.find();
});