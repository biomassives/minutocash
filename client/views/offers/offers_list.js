/**
 * Created by mindestens on 12/13/13.
 */
var offersData = [
  {
    name: 'Max Power',
    phone: '+41 79 123 45 67',
    content: 'Cooking, Coding Meteor Webapps, Sightseeing around Zurich.'
  },
  {
    name: 'Super Star',
    phone: '+41 78 321 54 76',
    content: 'Writing Biographies, Feeding pets like dogs, cats and cavies.'
  },
  {
    name: 'Bat Woman',
    phone: '+41 76 765 43 21',
    content: 'Decision Making, Teaching Tree climbing, Accounting.'
  }
];
Template.offersList.helpers({
  offers: offersData
});