/**
 * Created by mindestens on 12/21/13.
 */
Template.offerPage.helpers({
  ownOffer: function () {
    return this.ownerId === Meteor.userId();
  }
});