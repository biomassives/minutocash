/**
 * Created by mindestens on 12/21/13.
 */
Template.offerPageSettings.shareName = function () {
  return displayName(this.toString());
};

Template.offerPageSettings.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = { name: $(e.target).find('[name=username]').val() };

    Meteor.call('share', this._id, user.name, function (error, id) {
      if (error) {
        throwError(error.reason);
      }
    });
    // subscribe to the directory to update users
    // TODO: get rid of strange behaviour: is (maybe) displaying the loading template or something when the user hasn't been previously known. this makes UX bad. it looks like the page gets reloaded.
    Deps.autorun(function () {
      Meteor.subscribe("directory");
    });
  }
});

Template.offerPageSettings.events({
  'click button': function(e) {
    e.preventDefault();

    var userId = this.toString();
    var offerId = Session.get('actualOffer');

    Meteor.call('unshare', offerId, userId, function (error, id) {
      if (error) {
        throwError(error.reason);
      }
    });
  }
});