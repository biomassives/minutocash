/**
 * ======== offers data model ========
 * Each offer is represented by a document in the Offers collection:
 * _id: offer id (String)
 * created: timestamp of the creation date (Number)
 * updated: timestamp of the last update (Number)
 * ownerId: id of the owner (String)
 * ownerName: name of the owner (String) [denormalized]
 * firstname: First name (String)
 * lastname: Last Name (String)
 * content: Content (String)
 * contactFreeText1:  (String)
 * contactFreeText2:  (String)
 * phone: Phone number (String)
 * email: E-Mail (String)
 * website: Website (String)
 * addressStreet: Street (String)
 * addressPostalCode: Postal Code (String)
 * addressLocation: Location (String)
 * addressCountry: Country (String)
 * ===================================
 */
Offers = new Meteor.Collection('offers');

Offers.allow({
  remove: ownsDocument
});

Meteor.methods({
  createOffer: function (offerAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create a new offer");
    }

    // call method checkInputFields for all set fields which throws an error if needed
    // mandatory short fields
    var mandatoryShort = [
      "firstname",
      "lastname",
      "addressStreet",
      "addressPostalCode",
      "addressLocation",
      "addressCountry"
    ];
    checkInputFields(offerAttributes, mandatoryShort, 50, true);
    // optional short fields
    var optionalShort = [
      "contactFreeText1",
      "contactFreeText2",
      "phone",
      "email",
      "website"
    ];
    checkInputFields(offerAttributes, optionalShort, 50, false);
    // mandatory long fields
    var mandatoryLong = ["content"];
    checkInputFields(offerAttributes, mandatoryLong, 2000, true);
    // optional long fields
    // var optionalLong = [""];
    // checkInputFields(offerAttributes, optionalLong, 2000, false);


    var now = new Date().getTime();
    // pick out the whitelisted keys
    var offer = _.extend(_.pick(offerAttributes,
      'firstname',
      'lastname',
      'content',
      'contactFreeText1',
      'contactFreeText2',
      'phone',
      'email',
      'website',
      'addressStreet',
      'addressPostalCode',
      'addressLocation',
      'addressCountry'
    ), {
      // set meta properties
      ownerId: user._id,
      ownerName: displayName(user),
      created: now,
      updated: now
    });

    var offerId = Offers.insert(offer);

    return offerId;
  },
  editOffer: function (currentOfferId, offerAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user) {
      throw new Meteor.Error(401, "You need to login to create a new offer");
    }

    // ensure the user is the owner of the offer
    if (!ownsDocument(user._id, Offers.findOne(currentOfferId))) {
      throw new Meteor.Error(422, 'You are not the owner of this offer');
    }

    // call method checkInputFields for all set fields which throws an error if needed
    // mandatory short fields
    var mandatoryShort = [
      "firstname",
      "lastname",
      "addressStreet",
      "addressPostalCode",
      "addressLocation",
      "addressCountry"
    ];
    checkInputFields(offerAttributes, mandatoryShort, 50, true);
    // optional short fields
    var optionalShort = [
      "contactFreeText1",
      "contactFreeText2",
      "phone",
      "email",
      "website"
    ];
    checkInputFields(offerAttributes, optionalShort, 50, false);
    // mandatory long fields
    var mandatoryLong = ["content"];
    checkInputFields(offerAttributes, mandatoryLong, 2000, true);
    // optional long fields
    // var optionalLong = [""];
    // checkInputFields(offerAttributes, optionalLong, 2000, false);

    // pick out the whitelisted keys
    var updatedOffer = _.extend(_.pick(offerAttributes,
      'firstname',
      'lastname',
      'content',
      'contactFreeText1',
      'contactFreeText2',
      'phone',
      'email',
      'website',
      'addressStreet',
      'addressPostalCode',
      'addressLocation',
      'addressCountry'
    ), {
      // set meta properties
      updated: new Date().getTime()
    });

    Offers.update(currentOfferId, {$set: updatedOffer});
  }
});