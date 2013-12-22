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
  createOffer: function (offerAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create new offers");
    }

    // ensure the offer has a firstname
    if (!offerAttributes.firstname) {
      throw new Meteor.Error(422, 'Please fill in a first name');
    }
    // ensure the offers firstname is not too long
    if (offerAttributes.firstname.length > 50) {
      throw new Meteor.Error(422, 'First name is too long');
    }

    // ensure the offer has a lastname
    if (!offerAttributes.lastname) {
      throw new Meteor.Error(422, 'Please fill in a last name');
    }
    // ensure the offers lastname is not too long
    if (offerAttributes.lastname.length > 50) {
      throw new Meteor.Error(422, 'Last name is too long');
    }

    // ensure the offer has a phone numer
    if (!offerAttributes.phone) {
      throw new Meteor.Error(422, 'Please fill in a phone numer');
    }
    // ensure the offers phone number is not too long
    if (offerAttributes.phone.length > 50) {
      throw new Meteor.Error(422, 'Phone number is too long');
    }

    // ensure the offer has a content
    if (!offerAttributes.content) {
      throw new Meteor.Error(422, 'Please fill in a content');
    }
    // ensure the offers content is not too long
    if (offerAttributes.content.length > 2000) {
      throw new Meteor.Error(422, 'Offer is too long');
    }

    // pick out the whitelisted keys
    var offer = _.extend(_.pick(offerAttributes, 'firstname', 'lastname', 'phone', 'content'), {
      // set meta properties
      ownerId: user._id,
      ownerName: user.username,
      created: new Date().getTime(),
      // set additional properties
      sharedWith: []
    });

    var offerId = Offers.insert(offer);

    return offerId;
  },
  share: function (offerId, userName) {
    // TODO: check if the user is already on the list an throw an error
    var offer = Offers.findOne(offerId);
    if (!Meteor.users.findOne({username: userName}))
      throw new Meteor.Error(422, "No such user");
    var userId = Meteor.users.findOne({username: userName})._id;
    if (this.userId === userId)
      throw new Meteor.Error(422, "You can\'t share with yourself");
    if (userId !== offer.ownerId && ! _.contains(offer.sharedWith, userId)) {
      Offers.update(offerId, { $addToSet: { sharedWith: userId } });
    }
  },
  unshare: function (offerId, userId) {
    var offer = Offers.findOne(offerId);
    if (!Meteor.users.findOne({_id: userId}))
      throw new Meteor.Error(422, "No such user");
    if (userId !== offer.ownerId && _.contains(offer.sharedWith, userId)) {
      Offers.update(offerId, { $pull: { sharedWith: userId } });
    }
  }
});