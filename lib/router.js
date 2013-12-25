/**
 * Created by mindestens on 12/14/13.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  // wait for subscriptions
  waitOn: function () {
    return [ Meteor.subscribe('offersOwn'),
      Meteor.subscribe('offersShared'),
      Meteor.subscribe('shareRelations')
    ];
  }
});
Router.map(function () {
  this.route('offersList', {
    path: '/',
    data: function () {
      var oldSearch;
      Deps.nonreactive(function () { // to be updated only once
        oldSearch = Session.get('search');
      });
      // reset the displayed offer
      Session.set('actualOffer', null);
      return {oldSearch: oldSearch};
    }
  });
  this.route('offerPage', {
    path: '/offers/:_id',
    data: function () {
      Session.set('actualOffer', this.params._id);
      return Offers.findOne(this.params._id);
    }
  });
  this.route('offerEdit', {
    path: '/offers/:_id/edit',
    data: function () { return Offers.findOne(this.params._id); }
  });
  this.route('offerCreate', {
    path: '/create'
  });
  this.route('about', {
    path: '/about'
  });
});
var requireLogin = function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accesDenied');
    }
    this.stop();
  }
};
Router.before(requireLogin, {only: 'offerCreate'});
Router.before(function () { clearErrors(); });