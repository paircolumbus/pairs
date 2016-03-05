Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY'
});

Accounts.onLogin(function(){
  Router.go('pairs');
});

i18n.map("en",{
  loginButtonsLoggedOutDropdown: {
    signIn: "login",
    up: "host"
  }
});

AccountsTemplates.addField({
  _id: 'name',
  type: 'text',
  displayName: "Name",
  required: true,
});

AccountsTemplates.addField({
  _id: 'experience',
  type: 'select',
  displayName: 'Experience',
  template: 'experienceForm'
});

AccountsTemplates.addField({
  _id: 'teaching',
  type: 'text',
  displayName: "Teaching",
  required: false,
});

AccountsTemplates.addField({
  _id: 'learning',
  type: 'text',
  displayName: "Learning",
  required: false,
});
