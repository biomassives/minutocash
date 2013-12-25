/**
 * Created by mindestens on 12/21/13.
 */
Template.offerPageSettings.helpers({
  shareRelations: function () {
    return ShareRelations.find({offerId: this._id});
  },
  hasShareRelations: function () {
    return ShareRelations.find({offerId: this._id}).count();
  }
});

Template.offerPageSettings.events({
  'submit form': function(e) {
    e.preventDefault();

    // TODO: change to email instead of username?
    var user = { name: $(e.target).find('[name=username]').val() };
    var shareRelation = {
      // TODO: get the value with a different command? like template.data... (see discovermeteor p. 149)
      offerId: Session.get('actualOffer')
    };
    Meteor.call('createShareRelation', shareRelation, user.name, function (error, id) {
      if (error) {
        throwError(error.reason);
      }
      return id;
    });
  }
});