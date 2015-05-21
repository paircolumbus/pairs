Template.pairs.helpers({
  numberOfPairs: function () {
    return Pairs.find({}).count();
  },
  numberOfUnpaired: function () {
    return People.find({ pairee: null, join: true }).count();
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

generatePairs = function () {
  pairings = pair(People.find({ pairee: null, join: true }).fetch());
  pairings.first_half.forEach(function(e,i) {

    // set each person's pair
    id1 = pairings.first_half[i]._id;
    id2 = pairings.second_half[i]._id;

    Meteor.call('insertPair', {
      pair: [ id1, id2 ]
    });
  });
};

Template.pairs.events({
  "click .remove-it": function (event) {
    Meteor.call('resetPairees');
    Meteor.call('clearPairs');
    return false;
  },
  "click .save-it": function (event) {
    Meteor.call('savePairs');
    return false;
  },
  "click .pair-it": function (event) {
    generatePairs();
    return false;
  },
  "click .remove-one": function (event) {
    Meteor.call('removePair', this._id);
    return false;
  }
});

Template.pairs.rendered = function () {
  $(document).ready(function () {
    $.material.init();
  });
};
