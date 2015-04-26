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

    Pairs.update({_id: pair_id}, {$set: {pair: People.find({_id: id1}).fetch().concat(People.find({_id: id2}).fetch())}});
  },
  insertPerson: function (doc) {
    People.insert(doc);
  },
  unpair: function (doc) {
    // find the pair with the person in it
    var person_id = doc.id;
    var a = People.findOne(person_id);
    var pair_id = a.pairee

    // find the other people in the pair
    // and remove their pair_id links
    People.update({pairee: pair_id}, {$set: {pairee: "none"}}, {multi: true});

    // remove the pair
    Pairs.remove(pair_id);
  },
  resetPairees: function () {
    People.update({}, {$set: {pairee: null}}, {multi: true});
  }
});

