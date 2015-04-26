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
