/**
 * Created by mindestens on 12/14/13.
 */
Template.offerCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var offer = {
      firstname: $(e.target).find('[name=firstname]').val(),
      lastname: $(e.target).find('[name=lastname]').val(),
      content: $(e.target).find('[name=content]').val(),
      contactFreeText1: $(e.target).find('[name=contactFreeText1]').val(),
      contactFreeText2: $(e.target).find('[name=contactFreeText2]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      email: $(e.target).find('[name=email]').val(),
      website: $(e.target).find('[name=website]').val(),
      addressStreet: $(e.target).find('[name=addressStreet]').val(),
      addressPostalCode: $(e.target).find('[name=addressPostalCode]').val(),
      addressLocation: $(e.target).find('[name=addressLocation]').val(),
      addressCountry: $(e.target).find('[name=addressCountry]').val()
    };

    Meteor.call('createOffer', offer, function (error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      }

      Router.go('offerPage', {_id: id});
      return null;
    });
  }
});