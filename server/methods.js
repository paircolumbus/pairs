Meteor.methods({
  clearPairs: function () {
    Pairs.remove({});
    console.log("cleared pairs");
  },
  insertPair: function (doc) {
    Pairs.insert(doc);
  },
  insertPerson: function (doc) {
    People.insert(doc);
  },
  resetPairees: function () {
    People.update({}, {$set : {pairee: null}}, {multi: true});
  }
});

