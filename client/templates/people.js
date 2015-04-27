Template.people.helpers({
  people: function () {
    return People.find({});
  }
});

Template.people.events({
  'click .generate-person': function () {
    Meteor.call('generatePerson');
  }
});

Template.people.rendered = function () {
  $(document).ready(function () {
    $.material.init();
  });
};
