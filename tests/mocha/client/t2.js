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

  describe("pairs page", function () {
    describe("generating pairs", function () {
      it("generates pairs randomly, from unpaired people");

      it("pairs the unpaired", function (done) {

        // create some people
        _.times(5, function(){
          Meteor.call('generatePerson');
        });

        generatePairs();

        setTimeout(function(){
          chai.assert.equal(5, People.find({}).count());
          chai.assert.equal(2, Pairs.find({}).count());
          //chai.assert.equal(1, People.find({ pairee: null }).count());

          done();
        }, 1500);
      });
    });

    describe("clearing pairs", function () {
      it("removes all pairs and unpairs all people");
    });

    describe("saving pairs", function () {
      it("save pairs (records who paired with whom)");
    });

    describe("fullscreen view", function () {
      it("displays all pairs on one screen");
    });
  });

  describe("people page", function () {
    describe("adding a person", function () {
      it("creates a new person");

      it("gives the new person an avatar image with Gravatar");

      it("adds arrays of skills that the person is learning and teaching");
    });

    describe("generating a person", function () {
      it("creates a new person");

      it("gives the new person a fake name, email, Gravatar image, and skills");
    });

    describe("deleting a person", function () {
      context("when the person is unpaired", function () {
        it("removes the person");
      });

      context("when the person is paired", function () {
        it("removes the person");

        it("removes the person's pair");

        it("marks the person's previous pair as unpaired");
      });
    });
  });

  describe("a person", function () {
    describe("pairing with another person", function () {
      it("creates a pair with both people");

      it("marks both people as paired with each other");
    });

    describe("removing from a pair", function () {
      it("removes the pair");

      it("marks both people as not paired");
    });
  });
});
