'use strict';

angular.module('myApp.users', [
    'ngRoute',
    'myApp',
    'myApp.person'
])


    .controller('UsersCtrl', function ($scope) {

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


    });