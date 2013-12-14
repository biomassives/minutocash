/**
 * Created by mindestens on 12/14/13.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  // wait for subscriptions
  waitOn: function() { return Meteor.subscribe('offers'); }
});
Router.map(function() {
  this.route('offersList', {
    path: '/'
  });
  this.route('offerPage', {
    path: '/offers/:_id',
    data: function() { return Offers.findOne(this.params._id); }
  });
  this.route('offerCreate', {
    path: '/create'
  });
});