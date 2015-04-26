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

function getUnpaired() {
  return People.find({$or: [{"pairee": "none"}, {"pairee": null}]});
}

Template.person.helpers({
  people: getPeople,
  unpaired: getUnpaired
});
