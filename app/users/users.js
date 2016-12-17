'use strict';

angular.module('myApp.users', [
    'ngRoute',
    'myApp',
    'myApp.person'
])


    .controller('UsersCtrl', function ($scope) {

        $scope.person = {
            person_id: 1
        };
    });