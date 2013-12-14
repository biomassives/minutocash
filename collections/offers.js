/**
 * Created by mindestens on 12/13/13.
 */
Offers = new Meteor.Collection('offers');

Offers.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Offers.deny({
  update: function (userId, offer, fieldNames) {
    // may only edit the following fields (must be all fields which are being displayed by the form!):
    return (_.without(fieldNames, 'firstname', 'lastname', 'phone', 'content').length > 0);
  }
});

Meteor.methods({
  offer: function (offerAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create new offers");
    }

    // ensure the offer has a firstname
    if (!offerAttributes.firstname) {
      throw new Meteor.Error(422, 'Please fill in a first name');
    }

    // ensure the offer has a lastname
    if (!offerAttributes.lastname) {
      throw new Meteor.Error(422, 'Please fill in a last name');
    }

    // ensure the offer has a phone numer
    if (!offerAttributes.phone) {
      throw new Meteor.Error(422, 'Please fill in a phone numer');
    }

    // ensure the offer has a content
    if (!offerAttributes.content) {
      throw new Meteor.Error(422, 'Please fill in a content');
    }

    // pick out the whitelisted keys
    var offer = _.extend(_.pick(offerAttributes, 'firstname', 'lastname', 'phone', 'content'), {
      userId: user._id,
      author: user.username,
      created: new Date().getTime()
    });

    var offerId = Offers.insert(offer);

    return offerId;
  }
});