function pairs() {
  console.log("calling pairs");
  return Pairs.find({});
}

function unpaired() {
  return People.find({$or: [{"pairee": "none"}, {"pairee": null}]});
}

Template.body.helpers({
  pairs: pairs,
  unpaired: unpaired,
  numberOfPairs: function () {
    return pairs().count();
  },
  numberOfUnpaired: function () {
    return unpaired().count();
  },
  people: getPeople
});

Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper("people_from", function (id_array) {
  return id_array.map(function(d,i){
    return People.find({_id: d});
  });
});
