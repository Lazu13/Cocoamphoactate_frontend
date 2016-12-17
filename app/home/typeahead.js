/**
 * Created by Tom on 16.12.2016.
 */
'use strict';

angular.module('myApp.typeahead', [
    'ui.router',
    'ngRoute',
    'myApp',
    'myApp.person',
    'ngAnimate',
    'ui.bootstrap'
])

    .controller('TypeaheadCtrl', [ '$scope', '$state', function ($scope, $state) {

        $scope.data = [
            {id: 0, name: 'Games', value: 'valueGames'},
            {id: 1, name: 'Users', value: 'usersGames'}
        ];

        $scope.selection = $scope.data[0];


        $scope.getValue = function(val) {
            return $scope.games.map(function (item) {
                $scope.selectedGame = item;
                return item;
            })
        };

        $scope.goOn = function ($item) {
            $state.go('person', {"personId": $item.id});
        };

        var sampleGame =
            {
                'id' : 3,
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
                'id' : 1,
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
                'id' : 2,
                'name': 'Uncharted 4: Kres Złodzieja',
                'category': 'Action',
                'rating': 5,
                'readNum': 100,
                'readMoreText': "Read more",
                'description': 'A witcher (or hexer) is someone who has undergone extensive training, ruthless mental and physical conditioning, and mysterious rituals (which take place at "witcher schools" such as Kaer Morhen) in preparation for becoming an itinerant monsterslayer for hire. Geralt, the central character in Andrzej Sapkowskis Witcher series and the subsequent games inspired by them, is said in the stories to be one of the greatest witchers; he is certainly legendary, but whether famous or infamous is more open to interpretation (and/or subject to gameplay, as the case may be).',
                'image': 'http://planetagracza.pl/wp-content/uploads/2015/12/Uncharted-47-800x445.jpg'
            };

        $scope.games = [sampleGame, sampleGame1, sampleGame2];

    }]);