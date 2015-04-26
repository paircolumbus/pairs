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
  }
});
