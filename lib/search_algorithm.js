/**
 * Created by mindestens on 12/27/13.
 */
search = function (query) {
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
  return Offers.find(find);
};