Template.nav.helpers({
  activeIf: function (template) {
    return template === Router.current().lookupTemplate() ? 'active' : '';
  }
});
