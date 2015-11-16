Template.addPersonModal.events({
  "submit .new-person": function (event) {
    var commaSeparator = /\s*,\s*/;

    var name = event.target.name.value;
    var gender = event.target.gender.value;
    var nickname = event.target.nickname.value;
    var email = event.target.email.value;
    var experience = event.target.experience.value;
    var learning = event.target.learning.value.split(commaSeparator);
    var teaching = event.target.teaching.value.split(commaSeparator);

    Meteor.call('insertPerson', {
      name: name,
      gender: gender,
      nickname: nickname,
      email: email,
      experience: experience,
      learning: learning,
      teaching: teaching
    });

    event.target.name.value = "";
    event.target.gender.value = "";
    event.target.nickname.value = "";
    event.target.email.value = "";
    event.target.experience.value = "";
    $(event.target.learning).clearOptions();
    $(event.target.teaching).clearOptions();

    return false;
  }
});

Template.addPersonModal.rendered = function () {
  $(document).ready(function () {
    $.material.init();

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
