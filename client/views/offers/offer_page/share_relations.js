/**
 * Created by mindestens on 12/23/13.
 */
Template.shareRelations.events({
  'click button': function(e) {
    e.preventDefault();

      if (confirm("Delete this sharing offer?")) {
        ShareRelations.remove(this._id);
      }

    /*Meteor.call('unshare', offerId, userId, function (error, id) {
      if (error) {
        throwError(error.reason);
      }
    });*/
  }
});