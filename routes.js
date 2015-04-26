Router.configure({ layoutTemplate: 'layout' });

Router.route('/', function () { this.render('pairs'); });
Router.route('/people');
