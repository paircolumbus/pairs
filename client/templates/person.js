Template.person.events({
  'change select': function(e,t){
    if (e.target.value == "new pair"){
      // do nothing
    } else {
      Meteor.call('createPair', this._id, e.target.value);
    }
    return false;
  }
});

Template.person.helpers({
  isPaired: function (id) {
    a = People.findOne(id).pairee;
    return a != null;
  }
});
