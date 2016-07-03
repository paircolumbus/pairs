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

  describe("server methods", function () {
    describe("savePairs", function () {
      it("keeps track of previous pairs", function () {

        // create some people
        _.times(6, function(){
          Meteor.call('generatePerson');
        });

        Meteor.call('generatePairs');
        Meteor.call('savePairs');

        chai.assert.equal(0, People.find({paired: null}).count());
        chai.assert.equal(6, People.find({}).count());
        //chai.assert.equal(2, Pairs.find({}).count());
      });
    });

  });
});
