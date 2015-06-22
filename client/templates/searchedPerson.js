Template.person.events({
  "click .join-one": function (event) {
    console.log("joining one");
    console.log(this._id);
    Meteor.call('joinperson', this._id);
    return false;
  },
  "click .unjoin-one": function (event) {
    console.log("unjoining one");
    console.log(this._id);
    Meteor.call('unjoinperson', this._id);
    return false;
  }
});
