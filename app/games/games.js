'use strict';

angular.module('myApp.games', [
    'myApp.home'
])

    .controller('GamesCtrl', function ($scope) {
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
                'readNum': 100,
                'readMoreText': "Read more",
                'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
                'image': 'http://vignette2.wikia.nocookie.net/wiedzmin/images/5/5d/Wiedzmin.jpg/revision/latest?cb=20130430183556'
            };

        var sampleGame1 =
            {
                'name': 'Fifa17',
                'category': 'Sport',
                'rating': 4,
                'readNum': 100,
                'readMoreText': "Read more",
                'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
                'image': 'https://media.easports.com/content/www-easports/pl_PL/fifa/aktualnosci/2016/fifa-17-release-date/_jcr_content/headerImages/image.img.jpg'
            };

        var sampleGame2 =
            {
                'name': 'Uncharted 4: Kres Złodzieja',
                'category': 'Action',
                'rating': 5,
                'readNum': 100,
                'readMoreText': "Read more",
                'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
                'image': 'http://planetagracza.pl/wp-content/uploads/2015/12/Uncharted-47-800x445.jpg'
            };

        $scope.tmp = sampleGame;
        $scope.games = [sampleGame, sampleGame1, sampleGame2];
        $scope.games_last_month = [sampleGame1, sampleGame, sampleGame2];


        // TODO: repair dots disappearing
        $scope.readMore = function (exsampleGame) {
            if (exsampleGame.readMoreText == "Read more") {
                exsampleGame.readNum = 50000;
                exsampleGame.readMoreText = "Read less";
                jQuery(".readMoreTextDots").html("")
            }
            else {
                exsampleGame.readNum = 100;
                exsampleGame.readMoreText = "Read more";
                jQuery(".readMoreTextDots").html('...')//.prop('disabled', true);
            }
        }
    });