Meteor.methods({
  clearPairs: function () {
    Pairs.remove({});
  },
  insertPair: function (doc) {
    var pair_id = Pairs.insert(doc);
    console.log("pair_id is " + pair_id);
    return pair_id;
  },
  insertPerson: function (doc) {
    People.insert(doc);
  },
  resetPairees: function () {
    People.update({}, {$set: {pairee: null}}, {multi: true});
  }
});

