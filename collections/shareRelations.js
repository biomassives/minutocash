/**
 * Created by mindestens on 12/23/13.
 */
ShareRelations = new Meteor.Collection('shareRelations');

ShareRelations.allow({
  remove: ownsDocument
});