Template.searchPersonModal.helpers({
  searchResults: function () {
    searchTerm = Session.get('searchTerm');
    return People.find({name: searchTerm});
  }
});

Template.searchPersonModal.events({
  "click .search-person": function (event) {
    //var name = event.target.name.value;
    //event.target.name.value = "";

    Session.set('searchTerm', 'Vasanth');

    console.log("event: ");
    console.log(event.target.parent);

    console.log("parent data: ");
    console.log(Template.parentData(0));
    console.log(Template.parentData(1));



    return false;
  }
});

Template.searchPersonModal.rendered = function () {
  $(document).ready(function () {
    $.material.init();
    svar = Session.get('searchTerm');
    console.log(svar);
    this.searchTerm = svar;
  });
};
