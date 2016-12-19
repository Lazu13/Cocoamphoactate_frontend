'use strict';

angular.module('myApp.games', [
    'myApp',
    'ngCookies',
])

    .controller('GamesCtrl', function ($scope, $http, $cookies) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };
        /*
         var sampleGame =
         {
         'id': 0,
         'name': 'Wiedzmin 3: dziki gon',
         'platform': 'RPG',
         'rating': 3,
         'readNum': 100,
         'readMoreText': "Read more",
         'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
         'image': 'http://vignette2.wikia.nocookie.net/wiedzmin/images/5/5d/Wiedzmin.jpg/revision/latest?cb=20130430183556'
         };

         var sampleGame1 =
         {
         'id': 1,
         'name': 'Fifa17',
         'platform': 'Sport',
         'rating': 4,
         'readNum': 100,
         'readMoreText': "Read more",
         'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
         'image': 'https://media.easports.com/content/www-easports/pl_PL/fifa/aktualnosci/2016/fifa-17-release-date/_jcr_content/headerImages/image.img.jpg'
         };

         var sampleGame2 =
         {
         'id': 2,
         'name': 'Uncharted 4: Kres Złodzieja',
         'platform': 'Action',
         'rating': 5,
         'readNum': 100,
         'readMoreText': "Read more",
         'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
         'image': 'http://planetagracza.pl/wp-content/uploads/2015/12/Uncharted-47-800x445.jpg'
         };
         */

        //$scope.tmp = sampleGame;
        // $scope.games = [sampleGame, sampleGame1, sampleGame2];
        $scope.getGames = function () {
            $http.get('http://127.0.0.1:8000/games', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
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

       // $scope.games_last_month = [sampleGame1, sampleGame, sampleGame2];


        // TODO: repair dots disappearing
        $scope.readMore = function (exsampleGame) {
            if (exsampleGame.readMoreText == "Read more") {
                exsampleGame.readNum = 50;
                exsampleGame.readMoreText = "Read less";
                jQuery(".readMoreTextDots").html("")
            }
            else {
                exsampleGame.readNum = 10;
                exsampleGame.readMoreText = "Read more";
                jQuery(".readMoreTextDots").html('...')//.prop('disabled', true);
            }
        }
    });