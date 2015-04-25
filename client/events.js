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
  Meteor.call('clearPairs');

  pairings = pair(People.find({$or: [{pairee: null},{pairee: "none"}]}).fetch());

  pairings.first_half.forEach(function(e,i) {

    // set each person's pair
    id1 = pairings.first_half[i]._id;
    id2 = pairings.second_half[i]._id;

    Meteor.call('insertPair', {
      pair: [
        pairings.first_half[i],
        pairings.second_half[i]
      ]
    }, function(error, result){
      pair_id = result;

      console.log("id1 is " + id1);
      console.log("id2 is " + id2);
      console.log("pair_id is " + pair_id);

      People.update({_id: id1}, {$set: {pairee: pair_id}});
      People.update({_id: id2}, {$set: {pairee: pair_id}});
    });

  });
}

Template.body.events({
  "submit .pair-it": function (event) {
    generatePairs();
  },
  "submit .shuffle-it": function (event) {
    Meteor.call('resetPairees');
    generatePairs();
  }
});



