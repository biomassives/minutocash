/**
 * Created by mindestens on 12/13/13.
 */
Template.offersList.helpers({
  offers: function() {
    // return all offers and sort by created date
    return Offers.find({}, {sort: {created: -1}});
  }
});