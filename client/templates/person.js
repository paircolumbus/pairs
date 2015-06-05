Template.person.events({
  'change select': function(e,t){
    if (e.target.value == "new pair"){
      // do nothing
    } else {
      Meteor.call('createPair', this._id, e.target.value);
    }
    return false;
  },
  "click .remove-one": function (event) {
    Meteor.call('unpair', {id: this._id});
    return false;
  },
  "click .delete-one": function (event) {
    Meteor.call('deleteperson', this._id);
    return false;
  },
  "click .join-one": function (event) {
    Meteor.call('joinperson', this._id);
    return false;
  },
  "click .unjoin-one": function (event) {
    Meteor.call('unjoinperson', this._id);
    return false;
  },
});
