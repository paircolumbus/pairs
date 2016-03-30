Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY'
});

Accounts.onLogin(function(){
  Router.go('pairs');
});

i18n.map("en",{
  loginButtonsLoggedOutDropdown: {
    signIn: "admin",
    up: "host"
  }
});
