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
    a = People.find(person_id);
    console.log(a);
    console.log(a.fetch());

    var pair_id = 
    console.log("pair_id is " + pair_id);
    b = Pairs.find(pair_id).fetch();

    // find the other people in the pair
    console.log(b);

    // remove their pair_id links

    // remove the person's pair_id links

    // remove the pair
  },
  resetPairees: function () {
    People.update({}, {$set: {pairee: null}}, {multi: true});
  }
});

