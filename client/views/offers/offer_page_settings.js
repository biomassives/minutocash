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
  }
});