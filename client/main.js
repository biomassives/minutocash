displayName = function (userId) {
  return Meteor.users.findOne({_id: userId}).username;
};