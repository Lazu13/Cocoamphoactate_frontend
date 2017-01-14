'use strict';

angular.module('myApp.notification', [
    'ngRoute',
    'myApp'
])


    .controller('NotificationCtrl', function ($scope) {

        $scope.person = {
            person_id: 1
        };
    });