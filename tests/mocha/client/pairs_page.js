MochaWeb.testOnly(function () {
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
});
