/**
 * Created by mindestens on 12/14/13.
 */
Template.offerItem.helpers({
  ownOffer: function () {
    return this.ownerId === Meteor.userId();
  }
});