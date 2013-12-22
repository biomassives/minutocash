/**
 * Created by mindestens on 12/22/13.
 */
Template.searchForm.events({
  'keyup input': function (event) {
    Session.set('search', event.currentTarget.value)
  }
});

// focus to the search form
Template.searchForm.rendered = function () {
  $(".searchform").focus();
}

