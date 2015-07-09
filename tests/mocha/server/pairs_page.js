MochaWeb.testOnly(function () {
  describe("pairs page", function () {
    describe("generating pairs", function () {
      it("pairs the unpaired", function () {

        // create some people
        _.times(5, function(){
          Meteor.call('generatePerson');
        });

        Meteor.call('generatePairs');

        chai.assert.equal(5, People.find({}).count());
        chai.assert.equal(2, Pairs.find({}).count());
      });
    });

  });
});
