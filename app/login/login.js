'use strict';

angular.module('myApp.login', [
    'ui.validate',
    'ui.router',
    'ngCookies',
    'myApp',
    'myApp.register'
])

    .controller('LoginCtrl', function ($scope, $state, $http, $cookies) {

        $scope.goto = function () {
            var dataToSend = {
                'username': $scope.user.name,
                'password': $scope.user.password
            };

            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://127.0.0.1:8000/users/login',
                dataToSend,
                config
            )
                .success(function (data) {
                    $cookies.put('Authorization', data.token);
                    //console.log($cookies.get('Authorization'));
                    alert("Zalogowano pomyślnie");
                    $state.go('games');
                })
                .error(function () {
                    $cookies.remove('Authorization');
                    alert("Nie zalogowano");
                });
        }

    });