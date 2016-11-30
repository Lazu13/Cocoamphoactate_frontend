'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'myApp.home'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,  $urlRouterProvider) {

        /*
         $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
         });
        /*
         $routeProvider

         .when("/", {
         templateUrl: "/home/home.html",
         controller: "home/HomeCtrl"
         })

         .when("/games", {
         templateUrl: "games/games.html"
         })

         .otherwise({
         redirectTo: "/"
         });

         */

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

        $stateProvider.state(games);
        $stateProvider.state(home);

    }]);






