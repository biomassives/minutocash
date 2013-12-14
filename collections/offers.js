/**
 * Created by mindestens on 12/13/13.
 */
Offers = new Meteor.Collection('offers');
Offers.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !!userId;
  }
});