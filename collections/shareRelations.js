/**
 * Created by mindestens on 12/23/13.
 */
ShareRelations = new Meteor.Collection('shareRelations');

ShareRelations.allow({
  // TODO: check if this function is okay.
  update: function (userId, doc) {
    return doc && ( doc.receiverId === userId || doc.issuerId === userId);
  },
  remove: ownsDocument
});

