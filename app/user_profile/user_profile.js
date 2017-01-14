/**
 * Created by Tom on 15.12.2016.
 */
'use strict';

angular.module('myApp.user_profile', [
    'ngRoute',
    'myApp'
])


    .controller('UserProfileCtrl', function ($scope) {

        $scope.person = {
            person_id: 1
        };
    });