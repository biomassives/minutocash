/**
 * Created by mindestens on 12/23/13.
 */
Template.notifications.helpers({
  notifications: function () {
    return ShareRelations.find({receiverId: Meteor.userId(), accepted: false});
  },
  notificationCount: function () {
    return ShareRelations.find({receiverId: Meteor.userId(), accepted: false}).count();
  }
});

Template.notification.helpers({
  notificationOfferPath: function () {
    return Router.routes.offerPage.path({_id: this.offerId});
  }
});
Template.notification.events({
  'click a': function (e) {
    e.preventDefault();

    ShareRelations.update(this._id, {$set: {accepted: true}});
    var offer = { _id: this.offerId };
    Router.go('offerPage', offer);
  }
});