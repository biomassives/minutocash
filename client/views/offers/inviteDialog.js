/**
 * Created by mindestens on 12/20/13.
 */
Template.inviteDialog.helpers({
  sharedWith: function() {
    // return all offers and sort by created date
    return Offers.find();
  }
});

openInviteDialog = function () {
  Session.set("showInviteDialog", true);
};

Template.inviteDialog.events({
  'submit form': function (e) {
    e.preventDefault();

    var user = { name: $(e.target).find('[name=username]').val() };

    Meteor.call('invite', Session.get("actualOfferId"), user.name, function (error, id) {
      if (error) {
        return alert(error.reason);
      }
    });

  },
  'click .done': function (event, template) {
    Session.set("showInviteDialog", false);
    return false;
  }
});
