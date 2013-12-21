/**
 * Created by mindestens on 12/21/13.
 */
Template.offerPage.helpers({
  ownOffer: function () {
    return this.ownerId === Meteor.userId();
  }
});

Template.offerPage.shareName = function () {
  return displayName(this.toString());
};

Template.offerPage.events({
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