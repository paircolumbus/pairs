Meteor.subscribe("people");
Meteor.subscribe("pairs");

Globals = {page: function(){return "pairs"}};

Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper("isPairsPage", function () {
  return (Globals.page == "pairs");
});

Template.registerHelper("isPeoplePage", function () {
  return (Globals.page == "people");
});

Template.registerHelper('unpaired', function () {
  return People.find({ 'pairee': null });
});

Template.registerHelper('avatarFor', function (email) {
  if (email == null){
    email = 'meteor@meteor.com';
  }
  return Gravatar.imageUrl(email, { size: 32 });
});

Template.registerHelper( 'pairs', function () {
  return Pairs.find({});
});
