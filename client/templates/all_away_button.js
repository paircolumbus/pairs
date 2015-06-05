Template.allAwayButton.events({
  "click .all-away": function (event) {
    Meteor.call('allAway');
    return false;
  }
});

