var People = new Meteor.Collection("people");
var Pairs = new Meteor.Collection("pairs");
var Cards = new Meteor.Collection("cards");


pair = function(list){
  var shuffled = _.shuffle(list);
  var midpoint = Math.floor(shuffled.length / 2);
  var first_half = shuffled.slice(0,midpoint);
  var second_half = shuffled.slice(midpoint, shuffled.length);

  return {
    first_half: first_half,
    second_half: second_half
  };
};

if (Meteor.isClient) {
  Template.body.helpers({
    people: function () {
      return People.find({});
    },
    pairs: function () {
      return Pairs.find({});
    }
  });



  Template.cards.cards = function() {
    return Pairs.find({});
  }

  Template.cards.events({
    'click': function(){
      alert('clicked it!');
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

      pairings = pair(People.find().fetch());

      pairings.second_half.forEach(function(e,i) {
        Pairs.insert({
          pair: [
            pairings.first_half[i],
            pairings.second_half[i]
            ]
        });
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

