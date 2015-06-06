MochaWeb.testOnly(function () {
  beforeEach(function () {
    Meteor.call('clearPairs');
    Meteor.call('clearPeople');
  });
});
