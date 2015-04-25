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

Template.body.events({
  "submit .pair-it": function (event) {
    Meteor.call('clearPairs');

    console.log("cleared pairs");

    pairings = pair(People.find({pairee: null}).fetch());
    //console.log("2");
    console.log(pairings);

    pairings.second_half.forEach(function(e,i) {

      // set each person's pair
      var id1 = pairings.first_half[i]._id;
      var id2 = pairings.second_half[i]._id;
      People.update(id1, {$set: {pairee: id2}});
      People.update(id2, {$set: {pairee: id1}});
      console.log("paired: " + [id1, id2]);

      Meteor.call('insertPair', {
        pair: [
          pairings.first_half[i],
          pairings.second_half[i]
        ]
      });
    });

    //console.log("3");
    //return false;
  },
  "submit .shuffle-it": function (event) {
    Meteor.call('resetPairees');
  }


});
