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
  }
});

Template.search.results = function () {
  var query = Session.get('search');
  var offersTotal = Offers.find().count();
  var find = {};

  if (!!query) {
    _.extend(find, {
      $or: [
        // FIXME: Runs unescaped as regex, absolutely not ok
        // FIXME: Not user friendly, do we can have fulltext?
        { firstname: { $regex: query, $options: 'i' } },
        { lastname: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    });
  }

  var offers = Offers.find(find);
  return { count: offers.count(), offers: offers, offersTotal: offersTotal };
};