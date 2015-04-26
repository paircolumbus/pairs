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

Template.addPersonModal.rendered = function () {
  $('.input-list').selectize({
    create: function (input) {
      return {
        value: input,
        text: input
      };
    },
    plugins: [
      'remove_button'
    ]
  });
};

Template.person.events({
  'change select': function(e,t){
    People.update(this._id, {$set: {pairee: e.target.value}});
    return false;
  },
  "submit .remove-one": function (event) {
    Meteor.call('unpair', {id: this._id});
    return false;
  }
});

Template.person.helpers({
  people: getPeople
});
