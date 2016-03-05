function generateSkills() {
  var skills = [];
  _.times(_.random(1, 5), function () {
    skills.push(faker.company.bsNoun());
  });
  return skills;
}

function pair(list) {
  var shuffled = _.shuffle(list);
  var midpoint = Math.floor(shuffled.length / 2);
  var first_half = shuffled.slice(0,midpoint);
  var second_half = shuffled.slice(midpoint, shuffled.length);

  return {
    first_half: first_half,
    second_half: second_half
  };
}

Meteor.methods({
  // for tests only
  clearPeople: function () {
    People.remove({});
    return true;
  },
  clearPairs: function () {
    Pairs.remove({});
    return true;
  },
  generatePairs: function () {
    pairings = pair(People.find({ pairee: null, joined: true }).fetch());
    pairings.first_half.forEach(function(e,i) {

      // set each person's pair
      id1 = pairings.first_half[i]._id;
      id2 = pairings.second_half[i]._id;

      Meteor.call('insertPair', id1, id2);
    });
  },
  insertPair: function (id1, id2) {
    pair_id = Pairs.insert({pair: [id1, id2]});

    People.update(id1, {$set: {pairee: pair_id}});
    People.update(id2, {$set: {pairee: pair_id}});

    //Pairs.update({_id: pair_id}, {$set: {pair: People.find({_id: id1}).fetch().concat(People.find({_id: id2}).fetch())}});
    Meteor.call('pairedBefore', id1, id2);
  },
  insertPerson: function (doc) {
    person = People.insert(doc);

    // added people should always start out unpaired and assumed present
    People.update({_id: person}, {$set: {pairee: null, joined: true}});
  },
  updatePerson: function (id, doc) {
    People.update(id, {$set: doc});

    // remove from a pair when updated
    Meteor.call('unpair', {id: id});
  },
  generatePerson: function () {
    People.insert({
      name: faker.name.findName(),
      email: faker.internet.email(),
      learning: generateSkills(),
      teaching: generateSkills(),
      pairee: null,
      joined: true
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
    Meteor.call('insertPair', id1, id2);
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
  removePair: function(pair_id){
    // find the people in the pair
    // and remove their pair_id links
    People.update({pairee: pair_id}, {$set: {pairee: null}}, {multi: true});

    // remove the pair
    Pairs.remove(pair_id);
  },
  deleteperson: function (person_id) {
    // unpair if this person belonged to a pair
    if (Meteor.call('isPaired', person_id)){
      Meteor.call('unpair', {id: person_id});
    }

    // remove the person
    People.remove(person_id);
  },
  joinperson: function (person_id) {
    People.update({_id: person_id}, {$set: {joined: true}});
  },
  unjoinperson: function (person_id) {
    // unpair if this person belonged to a pair
    if (Meteor.call('isPaired', person_id)){
      Meteor.call('unpair', {id: person_id});
    }

    People.update({_id: person_id}, {$set: {joined: false}});
  },
  resetPairees: function () {
    People.update({}, {$set: {pairee: null}}, {multi: true});
  },
  allHere: function () {
    People.update({}, {$set: {joined: true}}, {multi: true});
  },
  allAway: function () {
    People.update({}, {$set: {joined: false}}, {multi: true});
    Meteor.call('clearPairs');
  },
  savePairs: function () {
    // null the unpaired
    People.update({pairee: null}, {$set: {paired: null}}, {multi: true});

    Pairs.find({}).forEach(function(pair,i){
      var allThePeople = People.find({pairee: pair._id}).fetch().map(function(d,i){
        return d._id;
      });
      People.find({pairee: pair._id}).forEach(function(person,i){
        allThePeopleMinusTheOnePerson = allThePeople.filter(function(d){
          return d != person._id;
        });
        People.update({_id: person._id}, {$set: {paired: allThePeopleMinusTheOnePerson}});
      });
    });
  },
  pairedBefore: function (id1, id2) {
    if (People.find({_id: id1, paired: {$in: [id2]}}).count() === 1) {
      pair_id = People.find({_id: id1}).fetch()[0].pairee;
      Pairs.update({_id: pair_id}, {$set: {alreadyPaired: true}});
    } else {
      // do nothing
    }
  },
  allUsers: function(){
    console.log("in allUsers");
    console.log(Meteor.users.find().fetch());
    return Meteor.users.find().fetch();
  }
});
