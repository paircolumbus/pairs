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
  console.log("in unpaired:");
  //return People.find({'pairee': null, joined: true });
  return Meteor.call('allUsers');
});

Template.registerHelper('avatarFor', function (email) {
  return Gravatar.imageUrl(email || '', { size: 32 });
});

Template.registerHelper( 'pairs', function () {
  console.log("pairs helper called");
  return Pairs.find({});
});

Template.registerHelper( 'toggleSkills', function () {
  toggleSkills();
});

Template.registerHelper( 'showSkills', function () {
  return Session.get('showSkills');
});
 
Template.registerHelper.usersOnline = function() {
    return Meteor.users.find({ "status.online": true  })
};
