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

        var sampleGame =
            {
                'id': 1,
                'name': 'Wiedzmin 3: dziki gon',
                'category': 'RPG',
                'rating': 3,
                'image': 'http://vignette2.wikia.nocookie.net/wiedzmin/images/5/5d/Wiedzmin.jpg/revision/latest?cb=20130430183556'
            };

        var sampleGame1 =
            {
                'id': 2,
                'name': 'Fifa17',
                'category': 'Sport',
                'rating': 4,
                'image': 'https://media.easports.com/content/www-easports/pl_PL/fifa/aktualnosci/2016/fifa-17-release-date/_jcr_content/headerImages/image.img.jpg'
            };

        var sampleGame2 =
            {
                'id': 3,
                'name': 'Uncharted 4: Kres Złodzieja',
                'category': 'Action',
                'rating': 5,
                'image': 'http://planetagracza.pl/wp-content/uploads/2015/12/Uncharted-47-800x445.jpg'
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
                        $http.get('http://127.0.0.1:8000/games/' + item, {
                            headers: {
                                'Authorization': 'token ' + $cookies.get('Authorization'),
                                'Content-Type': 'application/json'
                            }
                        })
                            .success(function (data1) {
                                data1.rating = data[item];
                                console.log(data1);
                                $scope.games.push(data1);
                            })
                            .error(function () {
                                $scope.games = [];
                            });
                    }
                })
                .error(function () {
                    $scope.games = [];
                });
        };

        $scope.games_last_month = [sampleGame1, sampleGame, sampleGame2];

    }]);