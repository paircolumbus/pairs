Template.person.events({
  'change select': function(e,t){
    Meteor.call('createPair', this._id, e.target.value);
    return false;
  },
  "submit .remove-one": function (event) {
    Meteor.call('unpair', {id: this._id});
    return false;
  }
});

function getUnpaired() {
  return People.find({$or: [{"pairee": null}]});
}

Template.person.helpers({
  people: getPeople,
  unpaired: getUnpaired
});
