Template.addPersonModal.rendered = function () {
  $('.input-list').selectize({
    create: function (input) {
      return {
        value: input,
        text: input
      };
    },
    plugins: [
      'remove_button'
    ]
  });
};
