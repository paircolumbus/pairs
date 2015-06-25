Template.searchedPerson.events({
  "click .join-one": function (event) {
    Meteor.call('joinperson', this._id);
    return false;
  },
  "click .unjoin-one": function (event) {
    Meteor.call('unjoinperson', this._id);
    return false;
  }
});
