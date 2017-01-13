'use strict';

angular.module('myApp.games', [
    'myApp',
    'ngCookies'
])

    .controller('GamesCtrl', function ($scope, $http) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.getGames = function () {
            $http.get('http://127.0.0.1:8000/games', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    data.forEach(function (item) {
                        item.readNum = 10;
                        item.readMoreText = "Read more";
                        item.rating = Math.floor((Math.random() * 5) + 1);
                    });
                    $scope.games = data;
                })
                .error(function () {
                    $scope.games = [];
                });
        };

        $scope.readMore = function (exsampleGame) {
            if (exsampleGame.readMoreText == "Read more") {
                exsampleGame.readNum = 50;
                exsampleGame.readMoreText = "Read less";
                jQuery(".readMoreTextDots").html("")
            }
            else {
                exsampleGame.readNum = 10;
                exsampleGame.readMoreText = "Read more";
                jQuery(".readMoreTextDots").html('...')
            }
        }
    });