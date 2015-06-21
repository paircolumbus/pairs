Template.searchPersonModal.events({
  "click .search-person": function (event) {
    console.log("why no more logging?");
    var commaSeparator = /\s*,\s*/;

    console.log(event);
    var name = event.target.name.value;

    console.log(name);

    var person = Meteor.call('searchPerson', {
      name: name,
    });

    //event.target.name.value = "";
    //event.target.email.value = "";

    console.log(person);
    return false;
  }
});

Template.searchPersonModal.rendered = function () {
  $(document).ready(function () {
    $.material.init();
  });
};
