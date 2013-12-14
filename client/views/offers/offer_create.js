/**
 * Created by mindestens on 12/14/13.
 */
Template.offerCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var offer = {
      firstname: $(e.target).find('[name=firstname]').val(),
      lastname: $(e.target).find('[name=lastname]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      content: $(e.target).find('[name=content]').val()
    }

    offer._id = Offers.insert(offer);
    Router.go('offerPage', offer);
  }
});