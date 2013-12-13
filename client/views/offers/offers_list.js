/**
 * Created by mindestens on 12/13/13.
 */
Template.offersList.helpers({
  offers: function() {
    return Offers.find();
  }
});