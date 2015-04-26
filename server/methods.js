Meteor.methods({
  clearPairs: function () {
    Pairs.remove({});
  },
  insertPair: function (doc) {
    id1 = doc.pair[0];
    id2 = doc.pair[1];

    pair_id = Pairs.insert(doc);

    People.update({_id: id1}, {$set: {pairee: pair_id}});
    People.update({_id: id2}, {$set: {pairee: pair_id}});

  },
  insertPerson: function (doc) {
    People.insert(doc);
  },
  resetPairees: function () {
    People.update({}, {$set: {pairee: null}}, {multi: true});
  }
});

