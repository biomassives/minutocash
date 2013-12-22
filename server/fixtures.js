/**
 * Created by mindestens on 12/14/13.
 */
if (Meteor.users.find().count() === 0) {
  // create some users
  Accounts.createUser({
    username: "Foobar",
    password: "Foobar"
  });
  Accounts.createUser({
    username: "Barfoo",
    password: "Barfoo"
  });
  Accounts.createUser({
    username: "Tester",
    password: "Tester"
  });
}

if (Offers.find().count() === 0) {
  // get the Id of the newly created test users
  var foobar = Meteor.users.findOne({username: "Foobar"});
  var barfoo = Meteor.users.findOne({username: "Barfoo"});
  var tester = Meteor.users.findOne({username: "Tester"});

  // create some offers
  Offers.insert({
    firstname: 'Max',
    lastname: 'Power',
    phone: '+41 79 123 45 67',
    content: 'Cooking, Coding Meteor Webapps, Sightseeing around Zurich.',
    ownerId: foobar._id,
    ownerName: foobar.username,
    created: new Date().getTime(),
    sharedWith: []
  });
  Offers.insert({
    firstname: 'Super',
    lastname: 'Star',
    phone: '+41 78 321 54 76',
    content: 'Writing Biographies, Feeding pets like dogs, cats and cavies.',
    ownerId: barfoo._id,
    ownerName: barfoo.username,
    created: new Date().getTime(),
    sharedWith: [foobar._id, barfoo._id]
  });
  Offers.insert({
    firstname: 'Bat',
    lastname: 'Woman',
    phone: '+41 76 765 43 21',
    content: 'Decision Making, Teaching Tree climbing, Accounting.',
    ownerId: tester._id,
    ownerName: tester.username,
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