/**
 * Created by mindestens on 12/31/13.
 */
Template.settings.events({
  'submit form': function (e) {
    e.preventDefault();

    var profileName = $(e.target).find('[name=profileName]').val();
    if (profileName.length > 30) {
      throwError(Meteor.Error(422, 'Your profile name is too long (max. 30 chars are allowed)').reason);
    } else {
      Meteor.users.update(Meteor.userId(), {$set: {"profile.name": profileName}});
    }
  }
});