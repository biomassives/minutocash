/**
 * Created by mindestens on 12/14/13.
 */
if (Meteor.users.find().count() === 0) {
  // create some users
  var foobarId = Accounts.createUser({
    username: "Foobar",
    password: "Foobar"
  });
  var barfooId = Accounts.createUser({
    username: "Barfoo",
    password: "Barfoo"
  });
  var testerId = Accounts.createUser({
    username: "Tester",
    password: "Tester"
  });
}

if (Offers.find().count() === 0) {
  // create some offers
  Offers.insert({
    firstname: 'Max',
    lastname: 'Power',
    phone: '+41 79 123 45 67',
    content: 'Cooking, Coding Meteor Webapps, Sightseeing around Zurich.',
    ownerId: foobarId,
    created: new Date().getTime(),
    sharedWith: []
  });
  Offers.insert({
    firstname: 'Super',
    lastname: 'Star',
    phone: '+41 78 321 54 76',
    content: 'Writing Biographies, Feeding pets like dogs, cats and cavies.',
    ownerId: barfooId,
    created: new Date().getTime(),
    sharedWith: [foobarId, testerId]
  });
  Offers.insert({
    firstname: 'Bat',
    lastname: 'Woman',
    phone: '+41 76 765 43 21',
    content: 'Decision Making, Teaching Tree climbing, Accounting.',
    ownerId: testerId,
    created: new Date().getTime(),
    sharedWith: []
  });
  // offer without an owner. for testing purposes (visible if no user is logged in?)
  Offers.insert({
    firstname: 'No',
    lastname: 'Owner',
    phone: '+41 76 765 43 21',
    content: 'Owning nothing and be owned by no one',
    created: new Date().getTime()
  });
}