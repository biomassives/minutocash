/**
 * Created by mindestens on 12/22/13.
 */
displayName = function (user) {
  // get the most appropriate human readable username with a secure fallback (= username)
  var userName = user.username;
  if (user.profile && user.profile.name) {
    userName = user.profile.name;
  }
  return userName;
};