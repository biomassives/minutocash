/**
 * Created by mindestens on 12/13/13.
 */
Template.offersList.helpers({
  offers: function () {
    // return all offers and sort by created date
    return Offers.find({}, {sort: {created: -1}});
  }
});

Template.offersList.results = function () {
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