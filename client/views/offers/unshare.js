/**
 * Created by mindestens on 12/21/13.
 */
Template.unshare.events({
  'submit form': function(e) {
    e.preventDefault();

    var user = { name: $(e.target).find('[name=usernameUnshare]').val() };

    Meteor.call('unshare', this._id, user.name, function (error, id) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});