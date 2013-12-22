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
        return alert(error.reason);
      }
    });
    // subscribe to the directory to update users
    Meteor.subscribe("directory");
  }
});

Template.offerPageSettings.events({
  'click button': function(e) {
    e.preventDefault();

    var userId = this.toString();
    var offerId = Session.get('actualOffer');

    Meteor.call('unshare', offerId, userId, function (error, id) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});