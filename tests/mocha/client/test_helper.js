MochaWeb.testOnly(function () {
  function cleanup () {
    Meteor.call('clearPairs');
    Meteor.call('clearPeople');
  }
  beforeEach(function(){
    cleanup();
  });
  afterEach(function(){
    //cleanup();
  });
});
