MochaWeb.testOnly(function () {
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
});
