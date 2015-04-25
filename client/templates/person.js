Template.person.helpers({
  avatarFor: function (email) {
    return Gravatar.imageUrl(email, { size: 32 });
  }
});
