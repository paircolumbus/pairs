Meteor.methods({
  clearPairs: function () {
    Pairs.remove({});
  },
  insertPair: function (doc) {
    Pairs.insert(doc);
  },
  insertPerson: function (doc) {
    People.insert(doc);
  }
});

