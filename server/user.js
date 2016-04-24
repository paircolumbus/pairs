// http://docs.meteor.com/#/full/accounts_oncreateuser
Accounts.onCreateUser(function(options, user) {
  // We still want the default hook's 'profile' behavior.
  console.log(["options: ", options]);
  console.log(["options.profile: ", options.profile]);
  console.log(["user: ", user]);
  console.log(["user.profile: ", user.profile]);
  user.profile = options.profile;



  // add extra fields to profile
  // profile is writeable on the client-side
  // so no malicious users allowed
  //
  // users should start out unpaired and assumed present
  user.pairee = null;
  user.joined = true;
  return user;
});
