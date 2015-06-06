MochaWeb.testOnly(function () {
  beforeEach(function () {
    Meteor.call('clearPairs');
    Meteor.call('clearPeople');
    console.log('clean DB');
  });
});
