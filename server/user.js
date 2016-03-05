// http://docs.meteor.com/#/full/accounts_oncreateuser
Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  user.profile = options.profile;

  // add extra fields to profile
  // profile is writeable on the client-side
  // so no malicious users allowed
  user.profile['pairee'] = null;
  user.profile['joined'] = true;
  return user;
});
