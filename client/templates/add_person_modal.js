Template.addPersonModal.events({
  "submit .new-person": function (event) {
    var commaSeparator = /\s*,\s*/;

    var name = event.target.name.value;
    var learning = event.target.learning.value.split(commaSeparator);
    var teaching = event.target.teaching.value.split(commaSeparator);

    People.insert({
      name: name,
      learning: learning,
      teaching: teaching
    });

    event.target.name.value = "";
    $(event.target.learning).clearOptions();
    $(event.target.teaching).clearOptions();

    return false;
  }
});
