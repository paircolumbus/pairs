Meteor.publish('pairs', function () {
  return Pairs.find({});
});

Meteor.publish('people', function () {
  return People.find({});
});

Meteor.publish('users', function () {
  return Meteor.users.find({}, {fields: {profile: 1, pairee: 1, joined: 1}});
});


Meteor.publish('userdata', function () {
  return Meteor.users.find({}, {fields: {profile: 1, pairee: 1, joined: 1}});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true }, { profile: {} });
});

// Deny all client-side updates to user documents
Meteor.users.deny({
  update: function(){ return true; }
});
