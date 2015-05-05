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
  describe("Pairs view", function () {
    describe("Generate pairs", function () {
      it("pairs the unpaired", function () {

        // create some people
        _.times(5, function(){
          Meteor.call('generatePerson');
        });

        generatePairs();

        setTimeout(function(){
          chai.assert.equal(5, People.find({}).count());
          chai.assert.equal(2, Pairs.find({}).count());
          chai.assert.equal(1, People.find({ pairee: null }).count());

        }, 2000);
      });
    });
  });
});
