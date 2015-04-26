Template.registerHelper("equals", function (a, b) {
  return (a == b);
});

Template.registerHelper("people_from", function (id_array) {
  return id_array.map(function(d,i){
    return People.find({_id: d});
  });
});
