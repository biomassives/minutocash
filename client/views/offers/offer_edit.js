/**
 * Created by mindestens on 12/14/13.
 */
Template.offerEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentOfferId = this._id,
      offerProperties = {
        updated: new Date().getTime(),
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

    Offers.update(currentOfferId, {$set: offerProperties}, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('offerPage', {_id: currentOfferId});
      }
    });
  },

  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Delete this offer?")) {
      var currentOffer = this;
      // call the method to delete all shareRelations with a relation to the to be deleted offer
      Meteor.call('removeShareRelationsOnOfferRemove', currentOffer, function (error) {
        if (error) {
          // display the error to the user
          throwError(error.reason);
        } else {
          Offers.remove(currentOffer._id);
          Router.go('offersList');
        }
      });
    }
  }
});