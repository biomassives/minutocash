/**
 * Created by mindestens on 12/23/13.
 */
Template.notifications.helpers({
  notifications: function() {
    return ShareRelations.find({receiverId: Meteor.userId(), accepted: false});
  },
  notificationCount: function() {
    return ShareRelations.find({receiverId: Meteor.userId(), accepted: false}).count();
  }
});
Template.notification.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.offerId});
  }
})
Template.notification.events({
  'click a': function() {
    ShareRelations.update(this._id, {$set: {accepted: true}});
  }
})