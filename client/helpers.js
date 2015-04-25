Template.body.helpers({
  pairs: function () {
    console.log("calling pairs");
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
