/**
 * Created by mindestens on 12/14/13.
 */
Template.offerEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentOfferId = this._id;

    var offerProperties = {
      firstname: $(e.target).find('[name=firstname]').val(),
      lastname: $(e.target).find('[name=lastname]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      content: $(e.target).find('[name=content]').val()
    };

    Offers.update(currentOfferId, {$set: offerProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('offerPage', {_id: currentOfferId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this offer?")) {
      var currentOfferId = this._id;
      Offers.remove(currentOfferId);
      Router.go('offersList');
    }
  }
});