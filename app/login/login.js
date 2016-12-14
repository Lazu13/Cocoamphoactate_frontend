'use strict';

angular.module('myApp.login', [
    'ui.validate',
    'ui.router',
    'myApp',
    'myApp.register'
])

    .controller('LoginCtrl', function ($scope, $state) {

        $scope.goto = function () {
            $state.go('home');
        }

    });