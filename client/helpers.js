Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper('unpaired', function () {
  return People.find({ 'pairee': null });
});
