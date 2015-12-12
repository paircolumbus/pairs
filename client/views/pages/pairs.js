Template.pairs.helpers({
  numberOfPairs: function () {
    return Pairs.find({}).count();
  },
  numberOfUnpaired: function () {
    return People.find({ pairee: null, joined: true }).count();
  }
});

Template.pairs.events({
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
