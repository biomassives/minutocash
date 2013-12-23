/**
 * Created by mindestens on 12/23/13.
 */
// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(message) {
  Errors.insert({message: message, seen:false});
};

clearErrors = function() {
  Errors.remove({seen: true});
}