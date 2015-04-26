Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper('unpaired', function () {
  return People.find({ 'pairee': null });
});

Template.registerHelper('avatarFor', function (email) {
    return Gravatar.imageUrl(email, { size: 32 });
});

Template.registerHelper(
  'pairs', function () {
    return Pairs.find({});
  });

Template.registerHelper(
  'numberOfPairs', function () {
    return Pairs.find({}).count();
  });

Template.registerHelper(
  'numberOfUnpaired', function () {
    return People.find({ pairee: null }).count();
  });

Template.registerHelper(
  'avatarFor', function (email) {
    return Gravatar.imageUrl(email, { size: 32 });
  });

Template.registerHelper(
  'twoPairs', function () {
    return Gravatar.imageUrl(email, { size: 32 });
  });


