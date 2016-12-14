'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'myApp.home',
    'myApp.register',
    'myApp.login',
    'ui.validate'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        };

        var games = {
            name: 'games',
            url: '/games',
            template: '<h3>hello world!</h3>'

        };

        var users = {
            name: 'users',
            url: '/users',
            templateUrl: 'users/users.html',
            controller : 'UsersCtrl'
        };

        var register = {
            name: 'register',
            url: '/register',
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        };

        var login = {
            name: 'login',
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        };

        $stateProvider.state(games);
        $stateProvider.state(home);
        $stateProvider.state(users);
        $stateProvider.state(register);
        $stateProvider.state(login);
        
    }]);






