Template.person.events({
  'change select': function(e,t){
    People.update(this._id, {$set: {pairee: e.target.value}});
    return false;
  },
  "submit .remove-one": function (event) {
    //unpair();
    return false;
  }
});

Template.person.helpers({
  people: getPeople
});
