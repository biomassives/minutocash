/**
 * Created by mindestens on 12/14/13.
 */
if (Offers.find().count() === 0) {
  Offers.insert({
    firstname: 'Max',
    lastname: 'Power',
    phone: '+41 79 123 45 67',
    content: 'Cooking, Coding Meteor Webapps, Sightseeing around Zurich.'
  });
  Offers.insert({
    firstname: 'Super',
    lastname: 'Star',
    phone: '+41 78 321 54 76',
    content: 'Writing Biographies, Feeding pets like dogs, cats and cavies.'
  });
  Offers.insert({
    firstname: 'Bat',
    lastname: 'Woman',
    phone: '+41 76 765 43 21',
    content: 'Decision Making, Teaching Tree climbing, Accounting.'
  });
}