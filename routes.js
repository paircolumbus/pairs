Router.configure({ layoutTemplate: 'layout' });

Router.route('/', 'pairs');
Router.map(function () {
  this.route('people', {
    onBeforeAction: function (pause) {
      if (!Meteor.user()) {
        this.render('pairs');
      } else {
        this.next();
      }
    }
  });
});

Router.route('/fullscreen');
