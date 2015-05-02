Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper('unpaired', function () {
  return People.find({ 'pairee': null });
});

Template.registerHelper('avatarFor', function (email) {
  if (email == null){
    email = 'meteor@meteor.com';
  }
  return Gravatar.imageUrl(email, { size: 32 });
});

Template.registerHelper( 'pairs', function () {
  return Pairs.find({});
});


third = function(){
  return Pairs.find({}).count() / 3;
}
twothird = function(){
  return third() * 2;
}



Template.registerHelper( 'pairset1', function () {
  return Pairs.find({},{limit: third()});
});
Template.registerHelper( 'pairset2', function () {
  return Pairs.find({},{skip: third(), limit: third()});
});
Template.registerHelper( 'pairset3', function () {
  return Pairs.find({},{skip: twothird(), limit: third()});
});

Template.registerHelper( 'numberOfPairs', function () {
  return Pairs.find({}).count();
});

Template.registerHelper( 'numberOfUnpaired', function () {
  return People.find({ pairee: null }).count();
});
