/**
 * Created by mindestens on 12/14/13.
 */
// check that the userId specified owns the documents
ownsDocument = function (userId, doc) {
  return doc && doc.ownerId === userId;
};