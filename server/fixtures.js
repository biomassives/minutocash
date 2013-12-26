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
    firstname: 'Max',
    lastname: 'Power',
    phone: '+41 79 123 45 67',
    content: 'Cooking, Coding Meteor Webapps, Sightseeing around Zurich.',
    ownerId: foobarId,
    ownerName: foobar.profile.name,
    created: new Date().getTime()
  });
  var superStarId = Offers.insert({
    firstname: 'Super',
    lastname: 'Star',
    phone: '+41 78 321 54 76',
    content: 'Writing Biographies, Feeding pets like dogs, cats and cavies.',
    ownerId: barfooId,
    ownerName: barfoo.profile.name,
    created: new Date().getTime()
  });
  var batWomanId = Offers.insert({
    firstname: 'Bat',
    lastname: 'Woman',
    phone: '+41 76 765 43 21',
    content: 'Decision Making, Teaching Tree climbing, Accounting.',
    ownerId: testerId,
    ownerName: tester.profile.name,
    created: new Date().getTime(),
  });
  // offer without an owner. for testing purposes (visible if no user is logged in?)
  var noOwnerId = Offers.insert({
    firstname: 'No',
    lastname: 'Owner',
    phone: '+41 76 765 43 21',
    content: 'Owning nothing and be owned by no one',
    created: new Date().getTime()
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