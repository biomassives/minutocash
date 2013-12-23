/**
 * Created by mindestens on 12/23/13.
 */
Template.shareRelation.events({
  'click button': function (e) {
    e.preventDefault();

    // FIXME: is this secure or use a method?
    if (confirm("Delete this sharing offer?")) {
      ShareRelations.remove(this._id);
    }

  }
});