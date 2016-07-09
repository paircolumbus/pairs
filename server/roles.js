var users = [
  {name:"admin",email:"admin@example.com",roles:['admin']}
];

_.each(users, function (user) {
  var id;

  //console.log('admin setup...');
  fetchResult = Meteor.users.find({"emails.address": 'admin@example.com'}).fetch()
  //console.log(["fetched: ", fetchResult]);
  if ( fetchResult.length == 0) {
    //console.log('a-empty');
    //console.log('creating admin...');
    id = Accounts.createUser({
      email: user.email,
      password: "password",
      profile: { name: user.name }
    });

  } else {
    //console.log('a-found');
    fetched = Meteor.users.findOne({"emails.address": 'admin@example.com'})
    //console.log(['fetched this: ', fetched]);

    id = fetched._id
  }

  //console.log('bb');
  if (user.roles.length > 0) {
    // Need _id of existing user record so this call must come
    // after `Accounts.createUser` or `Accounts.onCreate`
    //Roles.addUsersToRoles(id, user.roles, 'default-group');
    //console.log(['id and user roles', id, user.roles]);
    Roles.addUsersToRoles(id, user.roles);
  }

});

