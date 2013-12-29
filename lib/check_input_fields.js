/**
 * Created by mindestens on 12/29/13.
 */
checkInputFields = function (offerAttributes, fields, maxLength, mandatory) {
  for (var propIndex in fields) {
    // set the property name
    var propName = fields[propIndex];
    // if mandatory === true check if the field has some input
    if (mandatory) {
      // ensure the propName is set
      if (!offerAttributes[propName]) {
        throw new Meteor.Error(422, 'Please fill in ' + propName);
      }
    }
    // ensure the property is not too long
    if (offerAttributes[propName].length > maxLength) {
      throw new Meteor.Error(422, propName +' is too long');
    }
  }
};