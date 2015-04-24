Meteor.publish('pairs', function () {
  return Pairs.find({});
});

Meteor.publish('people', function () {
  return People.find({});
});
