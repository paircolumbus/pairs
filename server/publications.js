Meteor.publish('pairs', function () {
  return Pairs.find({});
});

Meteor.publish('people', function () {
  return People.find({});
});

Meteor.publish('users', function () {
  return Meteor.users.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true }, { profile: {} });
});
