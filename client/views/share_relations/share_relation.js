/**
 * Created by mindestens on 12/23/13.
 */
Template.shareRelation.events({
  'click button': function (e) {
    e.preventDefault();

    if (confirm("Delete this sharing offer?")) {
      ShareRelations.remove(this._id);
    }

  }
});