/**
 * Created by mindestens on 12/31/13.
 */
dateText = function (date) {
  // german date notation
  return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
};