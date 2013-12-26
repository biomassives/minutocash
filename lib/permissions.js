/**
 * Created by mindestens on 12/14/13.
 */
// check that the userId specified owns the documents
ownsDocument = function (userId, doc) {
  // ownerId = owner of an offer
  // receiverId = receiver of a shareRelation
  // issuerId = issuer of a shareRelation
  return doc && (doc.ownerId === userId || doc.receiverId === userId || doc.issuerId === userId);
};