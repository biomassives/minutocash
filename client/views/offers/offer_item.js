/**
 * Created by mindestens on 12/14/13.
 */
Template.offerItem.helpers({
  ownOffer: function () {
    return this.ownerId === Meteor.userId();
  },
  ownerName: function () {
    return displayName(this.ownerId);
  },
  detailsView: function () {
    if (this._id === Session.get('actualOffer')) {
      return true;
    } else {
      return false;
    }
  }
});