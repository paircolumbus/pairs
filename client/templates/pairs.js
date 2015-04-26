function pairs() {
  console.log("calling pairs");
  return Pairs.find({});
}

function unpaired() {
  return People.find({$or: [{"pairee": "none"}, {"pairee": null}]});
}

Template.pairs.helpers({
  pairs: pairs,
  unpaired: unpaired,
  numberOfPairs: function () {
    return pairs().count();
  },
  numberOfUnpaired: function () {
    return unpaired().count();
  }
});

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

clearPairs = function() {
  Meteor.call('clearPairs');
}

generatePairs = function () {

  pairings = pair(People.find({$or: [{pairee: null},{pairee: "none"}]}).fetch());

  pairings.first_half.forEach(function(e,i) {

    // set each person's pair
    id1 = pairings.first_half[i]._id;
    id2 = pairings.second_half[i]._id;

    Meteor.call('insertPair', {
      pair: [ id1, id2 ]
    });

  });
}

Template.pairs.events({
  "submit .remove-it": function (event) {
    Meteor.call('resetPairees');
    clearPairs();
  },
  "submit .pair-it": function (event) {
    generatePairs();
  }
});
