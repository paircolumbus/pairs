Router.configure({ layoutTemplate: 'layout' });

Router.route('/', 'pairs');
Router.route('/pairs');
Router.map(function () {
  this.route('people', {
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        Router.go('pairs');
      }
    }
  });
});

Router.route('/fullscreen');
Router.route('/faq');
Router.route('/contributing');
Router.route('/contributors');
Router.route('/about');
Router.route('/admin');

/*
Router.route('myAccount', {
  path: '/admin',
  onBeforeAction: function () {
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
      }
      else{
        Router.go('pairs');
      }
    }
  }
}
*/
