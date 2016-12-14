'use strict';

angular.module('myApp.home', [
    'myApp'
])

    .controller('HomeCtrl', function ($scope) {
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
                'name': 'Wiedzmin 3: dziki gon',
                'category': 'RPG',
                'rating': 3,
                'image': 'http://vignette2.wikia.nocookie.net/wiedzmin/images/5/5d/Wiedzmin.jpg/revision/latest?cb=20130430183556'
            };

        var sampleGame1 =
            {
                'name': 'Fifa17',
                'category': 'Sport',
                'rating': 4,
                'image': 'https://media.easports.com/content/www-easports/pl_PL/fifa/aktualnosci/2016/fifa-17-release-date/_jcr_content/headerImages/image.img.jpg'
            };

        var sampleGame2 =
            {
                'name': 'Uncharted 4: Kres Złodzieja',
                'category': 'Action',
                'rating': 5,
                'image': 'http://planetagracza.pl/wp-content/uploads/2015/12/Uncharted-47-800x445.jpg'
            };

        $scope.games = [sampleGame, sampleGame1, sampleGame2];
        $scope.games_last_month = [sampleGame1, sampleGame, sampleGame2];

    });