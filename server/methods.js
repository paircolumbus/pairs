function generateSkills() {
  var skills = [];
  _.times(_.random(1, 5), function () {
    skills.push(faker.company.bsNoun());
  });
  return skills;
}

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
  orderPairs: function(){
    var gridxy = function(){
      x=0;y=0;
      return function(){
        y++;
        if (y > 5){
          y = 0;
          x = x + 3;
        }
        return [x,y,x+1,y];
      }
    }();
    var pairs = Pairs.find({}).fetch();
    pairs.forEach(function(d,i){
      cs = gridxy();
      // take the people out,
      // update their positions
      // and put them back in
      pair_id = d._id;
      id1 = d.pair[0]._id;
      id2 = d.pair[1]._id;

      People.update({_id: id1}, {$set: {x: cs[0]}});
      People.update({_id: id1}, {$set: {y: cs[1]}});
      People.update({_id: id2}, {$set: {x: cs[2]}});
      People.update({_id: id2}, {$set: {y: cs[3]}});

      Pairs.update({_id: pair_id}, {$set: {pair: People.find({_id: id1}).fetch().concat(People.find({_id: id2}).fetch())}});
      return false;
    });
    return Pairs.find({});
  },
  insertPerson: function (doc) {
    var id = People.insert(doc);
    People.update(id, {$set: {x: 1}})
    People.update(id, {$set: {y: 1}})
  },
  generatePerson: function () {
    People.insert({
      name: faker.name.findName(),
      email: faker.internet.email(),
      learning: generateSkills(),
      teaching: generateSkills()
    });
  },
  createPair: function (id1, id2) {
    // if id1 is already part of a pair,
    // remove that pair
    // this is not possible with id2,
    // because id2 comes from the unpaired list
    if (Meteor.call('isPaired', id1)){
      Meteor.call('unpair', {id: id1});
    }

    // create the pair
    Meteor.call('insertPair', {pair: [id1, id2]});
  },
  isPaired: function(id){
    return People.findOne(id).pairee;
  },
  unpair: function (doc) {
    // find the pair with the person in it
    var person_id = doc.id;
    var a = People.findOne(person_id);
    var pair_id = a.pairee;

    // find the other people in the pair
    // and remove their pair_id links
    People.update({pairee: pair_id}, {$set: {pairee: null}}, {multi: true});

    // remove the pair
    Pairs.remove(pair_id);
  },
  resetPairees: function () {
    People.update({}, {$set: {pairee: null}}, {multi: true});
  }
});
