Meteor.methods({
  clearPairs: function () {
    Pairs.remove({});
    People.update({}, { $set: { paired: false } }, { multi: true });
  },
  insertPair: function (first, second) {
    People.update(first._id, { $set: { paired: true } });
    People.update(second._id, { $set: { paired: true } });
    Pairs.insert({
      pair: [
        first,
        second
      ]
    });
  },
  insertPerson: function (doc) {
    People.insert(doc);
  }
});
