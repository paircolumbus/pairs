Template.body.helpers({
  people: function () {
    return People.find({});
  }
});

Template.body.helpers({
  pairs: function () {
    return Pairs.find({});
  }
});
