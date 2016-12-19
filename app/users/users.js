'use strict';

angular.module('myApp.users', [
    'ngRoute',
    'myApp',
    'myApp.person'
])


    .controller('UsersCtrl', function ($scope, $http) {

        /*
         $scope.users = [
         {
         "id": 1,
         "user_one": 3,
         "name1": "tmp",
         "email1": "tomasz@tomasz.tomasz",
         "user_two": 4,
         "name2": "tmp2",
         "email2": "tomasz2@tomasz.tomasz"
         },
         {
         "id": 2,
         "user_one": 3,
         "name1": "tmp",
         "email1": "tomasz@tomasz.tomasz",
         "user_two": 2,
         "name2": "tmp3",
         "email2": "tomasz3@tomasz.tomasz"
         }
         ];
         */

        $scope.getUsers = function () {
            $http.get('http://127.0.0.1:8000/friends', {
                headers: {
                    'Authorization': 'token a6047d9688d4505babebac76e116961ba56ff3eb',//'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.forEach(function (item) {
                        item.name1 = item.user_one;
                        item.name2 = item.user_two;
                    });
                    $scope.users = data;
                })
                .error(function () {
                    $scope.users = [];
                });
        };

    });