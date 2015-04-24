Meteor.methods({
  clearPairs: function () {
    Pairs.remove({});
  }
});
