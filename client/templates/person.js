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

Template.person.helpers({
  isPaired: function (id) {
    a = People.findOne(id).pairee;
    if (a == null) {
      return false;
    } else {
      return true;
    }
  }
});
