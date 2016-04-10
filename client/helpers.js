Meteor.subscribe("people");
Meteor.subscribe("pairs");

Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper("notequals", function (a, b) {
  return (a != b);
});

Template.registerHelper("isPairsPage", function () {
  routeName = Router.current().route.getName();
  return (routeName === undefined || routeName === 'pairs');
});

Template.registerHelper("isPeoplePage", function () {
  return Router.current().route.getName() === "people";
});

Template.registerHelper("isFullscreenPage", function () {
  return Router.current().route.getName() === "fullscreen";
});

Template.registerHelper('unpaired', function () {
  return People.find({'pairee': null, joined: true });
});

Template.registerHelper('avatarFor', function (email) {
  return Gravatar.imageUrl(email || '', { size: 32 });
});

Template.registerHelper( 'pairs', function () {
  return Pairs.find({});
});

Template.registerHelper( 'toggleSkills', function () {
  toggleSkills();
});

Template.registerHelper( 'showSkills', function () {
  return Session.get('showSkills');
});

