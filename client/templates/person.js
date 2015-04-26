Template.person.events({
  'change select': function(e,t){
    console.log(t);
    console.log(e);
    console.log(this.name);
    People.update(this._id, {$set: {pairee: e.target.value}});
    return false;
  },
  "submit .remove-one": function (event) {
    console.log(event);
    console.log(this);
    //unpair();
    return false;
  }
});

Template.person.helpers({
  people: getPeople
});
