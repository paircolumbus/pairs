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
