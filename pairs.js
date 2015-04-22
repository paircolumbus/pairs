var People = new Mongo.Collection("people");
var Pairs = new Mongo.Collection("pairs");


pair = function(aaaa){
  b = _.shuffle(aaaa);
  midpoint = Math.floor(b.length / 2);
  bb = b.slice(0,midpoint);
  cc = b.slice(midpoint, b.length);

  return [bb, cc];
};

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
      $(event.target.learning).clearOptions();
      $(event.target.teaching).clearOptions();

      return false;
    }
  });

  $(document).ready(function () {
    $('.input-list').selectize({
      create: function (input) {
        return {
          value: input,
          text: input
        };
      },
      plugins: [
        'remove_button'
      ]
    });

  Template.body.events({
    "submit .pair-it": function (event) {

      pairs = [];
      pairs.push({
        person1: People.find().fetch()[0],
        person2: People.find().fetch()[1]
      });
      return false;
    }
  });
}
