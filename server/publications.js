/**
 * Created by mindestens on 12/14/13.
 */
// publish offers which the user owns
Meteor.publish('offersOwn', function () {
  // check if the user is logged in
  if (this.userId) {
    // return offers which the logged in user is permitted to view:
    // - owns the offer
    // - the offer has been shared with him
    return Offers.find({ownerId: this.userId});
  } else {
    // return no offers
    return Offers.find(null);
  }
});
// publish-with-relations according to the answer on http://stackoverflow.com/a/20769721/3068252
// local package publish-with-relations is required.
// publish offers where the user has a shareRelation accepted
Meteor.publish('offersShared', function () {
  return Meteor.publishWithRelations({
    handle: this,
    collection: ShareRelations,
    filter: {receiverId: this.userId, accepted: true },
    mappings: [{collection: Offers, key: 'offerId'}]
  });
});
// publish shareRelations relevant to the logged in user
Meteor.publish('shareRelations', function () {
  return ShareRelations.find(
    {$or: [
      {issuerId: this.userId},
      {receiverId: this.userId}
    ]}
  );
});