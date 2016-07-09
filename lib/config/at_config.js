AccountsTemplates.configure({
  confirmPassword: false,
  showForgotPasswordLink: true
});

AccountsTemplates.addField({
  _id: 'name',
  type: 'text',
  displayName: "Name",
  required: true,
  transform: function(name){
    console.log(["name is: ", name])
    return name;
  }
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
  template: 'teaching',
});

AccountsTemplates.addField({
  _id: 'understanding',
  type: 'text',
  displayName: "Understanding",
  required: false,
  template: 'understanding',
});

/*
  transform: function(things){
    console.log(["ATAF: things are: ", event])
    console.log(["ATAF: this is: ", this])
    return things.split(commaSeparator);
    return things;
  }
*/

AccountsTemplates.addField({
  _id: 'learning',
  type: 'text',
  displayName: "Learning",
  required: false,
  template: 'learning'
});
