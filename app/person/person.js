/**
 * Created by Tom on 15.12.2016.
 */
'use strict';

angular.module('myApp.person', [
    'ngRoute',
    'myApp'
])


    .controller('PersonCtrl', function ($scope) {

        $scope.person = {
            person_id: 1
        };
    });