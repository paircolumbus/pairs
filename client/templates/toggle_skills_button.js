toggleSkills = function () {
  if (Session.get('showSkills')) {
    Session.set('showSkills', false);
  } else {
    Session.set('showSkills', true);
  }
}

Template.toggleSkillsButton.events({
  "click .toggle-skills": function (event) {
    toggleSkills();
    return false;
  }
});

