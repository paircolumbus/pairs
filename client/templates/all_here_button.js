Template.allHereButton.events({
  "click .all-here": function (event) {
    Meteor.call('allHere');
    return false;
  }
});

