'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'myApp.home',
    'myApp.register',
    'ui.validate'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'home/home.html'
        };

        var games = {
            name: 'games',
            url: '/games',
            template: '<h3>hello world!</h3>'
        };

        var users = {
            name: 'users',
            url: '/users',
            templateUrl: 'users/users.html'
        };

        var register = {
            name: 'register',
            url: '/register',
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        };

        $stateProvider.state(games);
        $stateProvider.state(home);
        $stateProvider.state(users);
        $stateProvider.state(register);

    }]);






