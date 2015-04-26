Template.people.helpers({
  people: function () {
    return People.find({});
  }
});

Template.people.rendered = function () {
  $(document).ready(function () {
    $.material.init();
  });
};
