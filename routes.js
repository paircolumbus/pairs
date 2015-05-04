Router.configure({ layoutTemplate: 'layout' });

Router.route('/', function () {
  Globals.page = "pairs";
  this.render('pairs');
});
Router.route('/people', function(){
  Globals.page = "people";
  this.render('people');
});
Router.route('/fullscreen');
