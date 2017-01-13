'use strict';

angular.module('myApp.game', [
    'myApp.home',
    'ui.router',
    'ngCookies',
    'angular-input-stars'
])

    .controller('GameCtrl', ['$scope', '$state', '$stateParams', '$http', '$cookies', function ($scope, $state, $stateParams, $http, $cookies) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.getGame = function () {
            $http.get('http://127.0.0.1:8000/games/' + $stateParams.gameId, {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (data) {
                    $http.get('http://127.0.0.1:8000/games/' + $stateParams.gameId, {
                        headers: {
                            'Authorization': 'token ' + $cookies.get('Authorization'),
                            'Content-Type': 'application/json'
                        }
                    })
                    data.rating = 0;
                    $scope.sampleGame = data;
                })
                .error(function () {
                    alert("Nie ma takiej gry");
                    $state.go('games');
                });
        };

        $scope.comments = [
            {
                'userLogin': 'Tmp1',
                'comment': 'A witcher (or hexer) is someone who has undergone extensive training, ruthlA witcher (or hexer) is someone who has undergone extensive training, ruthlA witcher (or hexer) is someone who has undergone extensive training, ruthlA witcher (or hexer) is someone who has undergone extensive training, ruthl'
            },
            {
                'userLogin': 'Tmp2',
                'comment': 'A witcher (or hexer) is someone who has undergone extensive training, ruthlA witcher (or hexer) is someone who has undergone extensive training, ruthlA witcher (or hexer) is someone who has undergone extensive training, ruthlA witcher (or hexer) is someone who has undergone extensive training, ruthl'
            }
        ];

        $scope.clickHandler = function (starRating) {
            $scope.starRating = starRating;
        };

        $scope.confirmation = function () {
            var txt;
            var r = confirm("Add comment?");
            if (r == true) {
                txt = 'Dodano komentarz';
                $state.go('home');
            }
            else {
                txt = 'Nie dodano komentarza'
            }
            alert(txt);
        };

    }]);