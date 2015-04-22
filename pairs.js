var People = new Mongo.Collection("people");

if (Meteor.isClient) {
  Template.body.helpers({
    people: function () {
      return People.find({});
    }
  });

  Template.body.events({
    "submit .new-person": function (event) {
      var commaSeparator = /\s*,\s*/;

      var name = event.target.name.value;
      var learning = event.target.learning.value.split(commaSeparator);
      var teaching = event.target.teaching.value.split(commaSeparator);

      People.insert({
        name: name,
        learning: learning,
        teaching: teaching
      });

      event.target.name.value = "";
      event.target.learning.value = "";
      event.target.teaching.value = "";

      return false;
    }
  });
}
