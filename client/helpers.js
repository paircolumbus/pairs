Template.body.helpers({
  pairs: function () {
    return Pairs.find({});
  },
  unpaired: function () {
    return People.find({"pairee": "none"});
  },
  people: getPeople
});

Template.registerHelper("equals", function (a, b) {
  return (a == b);
});
