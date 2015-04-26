Template.tabs.helpers({
  activeIf: function (template) {
    return template === Router.current().lookupTemplate() ? 'active' : '';
  }
});
