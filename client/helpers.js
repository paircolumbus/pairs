Meteor.subscribe("people");
Meteor.subscribe("pairs");

Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper("notequals", function (a, b) {
  return (a != b);
});

Template.registerHelper("isPairsPage", function () {
  return Router.current().route.getName() === undefined;
});

Template.registerHelper("isPeoplePage", function () {
  return Router.current().route.getName() === "people";
});

Template.registerHelper('unpaired', function () {
  return People.find({ 'pairee': null });
});

Template.registerHelper('avatarFor', function (email) {
  return Gravatar.imageUrl(email || '', { size: 32 });
});

Template.registerHelper( 'pairs', function () {
  return Pairs.find({});
});

toggleSkills = function () {
  if (Session.get('showSkills')) {
    Session.set('showSkills', false);
  } else {
    Session.set('showSkills', true);
  }
}

Template.registerHelper( 'toggleSkills', function () {
  toggleSkills();
});

Template.registerHelper( 'showSkills', function () {
  return Session.get('showSkills');
});

Template.body.events({
  "click .toggle-skills": function (event) {
    toggleSkills();
    return false;
  }
});
