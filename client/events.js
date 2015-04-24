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
