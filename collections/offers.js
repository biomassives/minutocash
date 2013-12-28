/**
 * ======== offers data model ========
 * Each offer is represented by a document in the Offers collection:
 * _id: offer id (String)
 * created: timestamp of the creation date (Number)
 * updated: timestamp of the last update (Number)
 * ownerId: user._id (String)
 * ownerName: name of the owner (String) [denormalized]
 * firstname: First name (String)
 * lastname: Last Name (String)
 * content: Content (String)
 * contactFreeText1:  (String)
 * contactFreeText2:  (String)
 * phone: Phone number (String)
 * email:  (String)
 * website:  (String)
 * addressStreet:  (String)
 * addressPostalCode:  (String)
 * addressLocation:  (String)
 * addressCountry: (String)
 * ===================================
 */
Offers = new Meteor.Collection('offers');

Offers.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Offers.deny({
  update: function (userId, offer, fieldNames) {
    // TODO: check if all fields are not empty and not too long if an offer gets edited

    // may only edit the following fields (must be all fields which are being displayed by the form!):
    return (_.without(fieldNames, 'firstname', 'lastname', 'phone', 'content', 'updated').length > 0);
  }
});

Meteor.methods({
  createOffer: function (offerAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create a new offer");
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
      ownerName: displayName(user),
      created: new Date().getTime()
    });

    var offerId = Offers.insert(offer);

    return offerId;
  }
});