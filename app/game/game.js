'use strict';

angular.module('myApp.game', [
    'myApp.home',
    'ui.router',
    'angular-input-stars'
])

    .controller('GameCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $scope.sampleGame =
            {
                'id': 0,
                'name': 'Wiedzmin 3: dziki gon',
                'category': 'RPG',
                'rating': 3,
                'readNum': 100,
                'readMoreText': "Read more",
                'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
                'image': 'http://vignette2.wikia.nocookie.net/wiedzmin/images/5/5d/Wiedzmin.jpg/revision/latest?cb=20130430183556'
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

        $scope.clickHandler = function(starRating)
        {
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