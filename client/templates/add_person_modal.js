Template.addPersonModal.events({
  "submit .new-person": function (event) {
    var commaSeparator = /\s*,\s*/;

    var name = event.target.name.value;
    var learning = event.target.learning.value.split(commaSeparator);
    var teaching = event.target.teaching.value.split(commaSeparator);

    Meteor.call('insertPerson', {
      name: name,
      learning: learning,
      teaching: teaching,
      pairee: null
    });

    event.target.name.value = "";
    $(event.target.learning).clearOptions();
    $(event.target.teaching).clearOptions();

    return false;
  }
});

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
