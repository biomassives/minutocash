/**
 * Created by mindestens on 12/14/13.
 */
if (Meteor.users.find().count() === 0) {
  // create some users
  var foobarId = Accounts.createUser({
    username: "Foobar",
    password: "Foobar",
    profile: { name: 'Foobar Name' },
    email: "foobar@uru.ch"
  });
  var foobar = Meteor.users.findOne(foobarId);
  var barfooId = Accounts.createUser({
    username: "Barfoo",
    password: "Barfoo",
    profile: { name: 'Barfoo Name' },
    email: "barfoo@uru.ch"
  });
  var barfoo = Meteor.users.findOne(barfooId);
  var testerId = Accounts.createUser({
    username: "Tester",
    password: "Tester",
    profile: { name: 'Tester Name' },
    email: "tester@uru.ch"
  });
  var tester = Meteor.users.findOne(testerId);
}

if (Offers.find().count() === 0) {
  // create some offers
  var maxPowerId = Offers.insert({
    created: new Date().getTime(),
    updated: new Date().getTime(),
    ownerId: foobarId,
    ownerName: foobar.profile.name,
    firstname: 'Max',
    lastname: 'Power',
    content: 'Cooking, Coding Meteor Webapps, Sightseeing around Zurich.',
    contactFreeText1: "sinndrin genossenschaft",
    contactFreeText2: "Meteor Telescoper",
    phone: '+41 79 123 45 67',
    email: "max@example.org",
    website: "www.example.org",
    addressStreet: "Fakestreet 123",
    addressPostalCode: "8001",
    addressLocation: "Zürich",
    addressCountry: "Switzerland"
  });
  var superStarId = Offers.insert({
    created: new Date().getTime(),
    updated: new Date().getTime(),
    ownerId: barfooId,
    ownerName: barfoo.profile.name,
    firstname: 'Super',
    lastname: 'Star',
    content: 'Writing Biographies, Feeding pets like dogs, cats and cavies.',
    contactFreeText1: "",
    contactFreeText2: "",
    phone: '+41 78 321 54 76',
    email: "super@example.org",
    website: "",
    addressStreet: "Mockupway 77",
    addressPostalCode: "8004",
    addressLocation: "Zürich",
    addressCountry: "Switzerland"
  });
  var batWomanId = Offers.insert({
    created: new Date().getTime(),
    updated: new Date().getTime(),
    ownerId: testerId,
    ownerName: tester.profile.name,
    firstname: 'Bat',
    lastname: 'Woman',
    content: 'Decision Making, Teaching Tree climbing, Accounting.',
    contactFreeText1: "",
    contactFreeText2: "",
    phone: '+41 76 765 43 21',
    email: "bat@example.org",
    website: "bat.example.org",
    addressStreet: "Whooopypath 987",
    addressPostalCode: "8002",
    addressLocation: "Zürich",
    addressCountry: "Switzerland"
  });
}

if (ShareRelations.find().count() === 0) {
  // create some shareRelations
  ShareRelations.insert({
    offerId: superStarId,
    offerFirstAndLastname: Offers.findOne({_id: superStarId}).firstname + " " +
      Offers.findOne({_id: superStarId}).lastname,
    issuerId: barfooId,
    issuerName: barfoo.profile.name,
    receiverId: foobarId,
    receiverName: foobar.profile.name,
    accepted: false,
    created: new Date().getTime()
  });
  ShareRelations.insert({
    offerId: maxPowerId,
    offerFirstAndLastname: Offers.findOne({_id: maxPowerId}).firstname + " " +
      Offers.findOne({_id: maxPowerId}).lastname,
    issuerId: foobarId,
    issuerName: foobar.profile.name,
    receiverId: barfooId,
    receiverName: barfoo.profile.name,
    accepted: false,
    created: new Date().getTime()
  });
  ShareRelations.insert({
    offerId: maxPowerId,
    offerFirstAndLastname: Offers.findOne({_id: maxPowerId}).firstname + " " +
      Offers.findOne({_id: maxPowerId}).lastname,
    issuerId: foobarId,
    issuerName: foobar.profile.name,
    receiverId: testerId,
    receiverName: tester.profile.name,
    accepted: false,
    created: new Date().getTime()
  });
}