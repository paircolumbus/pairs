selectizeComponents = function () {
  //$(document).ready(function () {
    $.material.init();

    //console.log("selectizing...");
    //console.log(["this is: ", this])
    //inputLists = this.$('.input-list').size()
    //console.log(`Applying to ${inputLists} input lists...`);

    this.$('.input-list').selectize({
      create: function (input) {
        console.log("inside selectize create");
        console.log(["this is: ", this])
        return {
          value: input,
          text: input
        };
      },
      plugins: [
        'remove_button'
      ]
    });
  //});
};

Template.learning.onRendered(selectizeComponents);
Template.teaching.onRendered(selectizeComponents);
