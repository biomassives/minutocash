/**
 * Created by mindestens on 12/14/13.
 */
Template.offerItem.helpers({
  ownOffer: function () {
    return this.userId === Meteor.userId();
  }
});