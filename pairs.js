var People = new Mongo.Collection("people");
var Pairs = new Mongo.Collection("pairs");


pair = function(list){
  var shuffled = _.shuffle(list);
  var midpoint = Math.floor(shuffled.length / 2);
  var half_one = shuffled.slice(0,midpoint);
  var half_two = shuffled.slice(midpoint, shuffled.length);

  return [half_one, half_two];
};

if (Meteor.isClient) {
  Template.body.helpers({
    people: function () {
      return People.find({});
    }
  });

  Template.body.helpers({
    pairs: function () {
      return Pairs.find({});
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
  });

  Template.body.events({
    "submit .pair-it": function (event) {

      Meteor.call('clearPairs');

      a = pair(People.find().fetch());
      bb = a[0];
      cc = a[1];
      console.log([bb,cc]);

      i = 0
      a[0].forEach(function() {
        Pairs.insert({
          person1: bb[i],
          person2: cc[i]
        });
        i++;
      });

      return false;
    }
  });
}
if (Meteor.isServer) {
  Meteor.methods({
    clearPairs: function () {
      Pairs.remove({});
    }
  });
}







