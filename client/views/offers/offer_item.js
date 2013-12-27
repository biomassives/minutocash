/**
 * Created by mindestens on 12/14/13.
 */
Template.offerItem.helpers({
  ownOffer: function () {
    return this.ownerId === Meteor.userId();
  },
  detailsView: function () {
    if (this._id === Session.get('actualOffer')) {
      return true;
    } else {
      return false;
    }
  },
  shareIssuerName: function () {
    if (ShareRelations.findOne({offerId: this._id, receiverId: Meteor.userId()}))
      return ShareRelations.findOne({offerId: this._id, receiverId: Meteor.userId()}).issuerName;
  }
});


Template.offerItem.events({
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm("Delete this offer from my collection?")) {
      Meteor.call('removeShareRelationAsReceiver', this, function (error) {
        if (error) {
          // display the error to the user
          throwError(error.reason);
        } else {
          Router.go('offersList');
        }
      });
    }
  },
  'click .generate-pdf': function (e) {
    e.preventDefault();

    // call the method which generates the pdf
    generateOffersPdf(Offers.find({_id: this._id}));
  }
});
