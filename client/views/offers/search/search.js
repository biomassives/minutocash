/**
 * Created by mindestens on 12/22/13.
 */
Template.search.events({
  'keyup input': function (event) {
    Session.set('search', event.currentTarget.value);
  },
  // do nothing if return is pressed
  'keypress input': function (event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  },
  'click .generate-pdf-of-all-visible-offers': function (e) {
    e.preventDefault();

    // using search as filter
    var query = Session.get('search'),
      offers = search(query);

    // call the method which generates the pdf
    generateOffersPdf(offers);
  }
});

Template.search.results = function () {
  var offersTotal = Offers.find().count(),
    query = Session.get('search'),
    offers = search(query);
  return { count: offers.count(), offers: offers, offersTotal: offersTotal };
};