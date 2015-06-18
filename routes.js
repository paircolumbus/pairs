Router.configure({ layoutTemplate: 'layout' });

Router.route('/', 'pairs');
Router.map(function () {
  this.route('people', {
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('pairs');
      }
    }
  });
});

Router.route('/fullscreen');
