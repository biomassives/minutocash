/**
 * Created by mindestens on 12/22/13.
 */
displayName = function (userId) {
  return Meteor.users.findOne({_id: userId}).username;
};