'use strict';

angular.module('myApp.home', [
    'myApp',
    'ui.router',
    'ngCookies'
])

    .controller('HomeCtrl', ['$scope', '$http', '$state', '$cookies', function ($scope, $http, $state, $cookies) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        var getGames = function (item, games) {
            $http.get('http://127.0.0.1:8000/games/' + item, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data1) {
                    for (var i in games) {
                        if (games[i].key == item) {
                            games[i].data = data1;
                        }
                    }
                })

                .error(function () {
                    games = [];
                })
        };

        $scope.topGames = function () {
            $http.get('http://127.0.0.1:8000/users/recommend/mostPopular', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.games = [];
                    for (var item in data) {
                        $scope.games.push({
                            'key': item,
                            'rating': Math.floor(data[item])
                        });
                    }
                    for (var item in data) {
                        getGames(item, $scope.games);
                    }
                })

                .error(function () {
                    $scope.games = [];
                });
        };


        $scope.recommendedGames = function () {
            $http.get('http://127.0.0.1:8000/users/recommend/type/' + '0', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.recGames = [];
                    for (var item in data) {
                        $scope.recGames.push({
                            'key': item,
                            'rating': Math.floor(data[item])
                        });
                    }
                    for (var item in data) {
                        getGames(item, $scope.recGames);
                    }
                })

                .error(function () {
                    $scope.recGames = [];
                });
        };

        $scope.recommendedGamesFriends = function () {
            return $http.get('http://127.0.0.1:8000/users/recommend/type/' + '1', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $scope.recGamesFriends = [];
                    for (var item in data) {
                        $scope.recGamesFriends.push({
                            'key': item,
                            'rating': Math.floor(data[item])
                        });
                    }
                    for (var item in data) {
                        getGames(item, $scope.recGamesFriends);
                    }
                })

                .error(function () {
                    $scope.recGamesFriends = [];
                })

                .then(function () {
                    return $scope.recGamesFriends;
                });
        };
    }]);