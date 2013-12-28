/**
 * Created by mindestens on 12/14/13.
 */
Template.offerEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentOfferId = this._id,
      offerProperties = {
        firstname: $(e.target).find('[name=firstname]').val(),
        lastname: $(e.target).find('[name=lastname]').val(),
        phone: $(e.target).find('[name=phone]').val(),
        content: $(e.target).find('[name=content]').val(),
        updated: new Date().getTime()
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