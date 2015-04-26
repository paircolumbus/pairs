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
  $(document).ready(function () {
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
  });
};
