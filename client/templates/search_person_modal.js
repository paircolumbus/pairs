Template.searchPersonModal.helpers({
  searchResults: function () {
    searchTerm = Session.get('searchTerm');
    regex = '^' + searchTerm;
    return People.find({name: {$regex: regex, $options: 'i'}});
  }
});

Template.searchPersonModal.events({
  "change .search-text": function (event) {
    var name = event.target.value;
    Session.set('searchTerm', name);
    return false;
  },
  "click .done-person": function (event) {
    return false;
  }
});

Template.searchPersonModal.rendered = function () {
  $(document).ready(function () {
    $.material.init();
    svar = Session.get('searchTerm');
    this.searchTerm = svar;
  });
};
