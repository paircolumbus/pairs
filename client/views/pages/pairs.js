Template.pairs.helpers({
  username: function () {
    return Meteor.user().profile.name;
  },
  numberOfPairs: function () {
    return Pairs.find({}).count();
  },
  numberOfUnpaired: function () {
    return People.find({ pairee: null, joined: true }).count();
  },
  usersOnline: function() {
    return Meteor.users.find({ "status.online": true  }).fetch();
  }
});

Template.pairs.events({
  "click .logout": function (event) {
    Meteor.logout();
    return false;
  },
  "click .remove-it": function (event) {
    Meteor.call('resetPairees');
    Meteor.call('clearPairs');
    return false;
  },
  "click .save-it": function (event) {
    Meteor.call('savePairs');
    return false;
  },
  "click .pair-it": function (event) {
    Meteor.call('generatePairs');
    return false;
  },
  "click .remove-one": function (event) {
    Meteor.call('removePair', this._id);
    return false;
  }
});

Template.pairs.rendered = function () {
  $(document).ready(function () {
    $.material.init();
  });
};
