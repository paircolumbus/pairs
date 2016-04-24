Meteor.subscribe('users');
Meteor.subscribe('userdata');

/*
Template.registerHelper("users", function () {
  console.log("inside template helpers users...");
  //Meteor.subscribe('users');
  users = Meteor.users.find({});
  console.log(`Returning users:`);
  users.fetch().forEach(u => console.log(u))
  return users;
});
*/
Template.registerHelper("unpaired", function () {
  users = Meteor.users.find({});
  return users;
});

Template.registerHelper("numberOfUnpaired", function () {
  console.log(["this is: ", this])
  users = Meteor.users.find({ pairee: null, joined: true });
  return users.count();
});

/*
*/

/*
Template.pairs.onCreated(function () {
  this.subscribe("users");
  this.subscribe("userdata");
});
*/

/*
Template.registerHelper("number", function (a) {
  return a.fetch().length;
});
*/

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


/*
Template.registerHelper('unpaired', function () {
  console.log("in unpaired:");
  if (true) {
    users = Meteor.users.find({'pairee': null, joined: true }).fetch();
    console.log(["users returned: ", users]);
    return users;
  } else {
    //return People.find({'pairee': null, joined: true });
    return [1,2,4]
  }
});
*/


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

Template.registerHelper.usersOnline = function() {
  return Meteor.users.find({ "status.online": true  })
};

