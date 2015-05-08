toggleSkills = function () {
  if (Session.get('showSkills')) {
    Session.setPersistent('showSkills', false);
  } else {
    Session.setPersistent('showSkills', true);
  }
}

Template.toggleSkillsButton.events({
  "click .toggle-skills": function (event) {
    toggleSkills();
    return false;
  }
});

