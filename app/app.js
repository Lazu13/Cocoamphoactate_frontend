'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ngMaterial',
    'ngAria',
    'ngResource',
    'ngCookies',
    'myApp.home',
    'myApp.register',
    'myApp.login',
    'myApp.logout',
    'myApp.notification',
    'myApp.user_profile',
    'myApp.games',
    'myApp.game',
    'myApp.users',
    'myApp.favs',
    'myApp.game_lib',
    'myApp.friends',
    'myApp.person',
    'myApp.typeahead',
    'angular-input-stars',
    'ui.validate'
])

    .factory('principal', ['$q', '$http', '$cookies',function ($q, $http, $cookies) {


        var _identity = undefined,
            _authenticated = false;

        return {

            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },

            isAuthenticated: function () {
                return _authenticated || $cookies.get('Authorization');
            },

            isInRole: function (role) {
                if (!_authenticated || !_identity.roles)
                    return false;

                return _identity.roles.indexOf(role) != -1;
            },

            isInAnyRole: function (roles) {
                if (!_authenticated || !_identity.roles) return false;

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) return true;
                }

                return false;
            },

            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;
            },

            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) {
                    _identity = undefined;
                }

                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                var self = this;
                $http.get('http://127.0.0.1:8000/user', {
                    headers: {
                        'Authorization': 'token ' + $cookies.get('Authorization'),
                        'Content-Type': 'application/json'
                    }
                })
                    .success(function (data) {
                        self.authenticate(data);
                        deferred.resolve(_identity);
                    })
                    .error(function () {
                        self.authenticate(null);
                        deferred.resolve(_identity);
                    });

                return deferred.promise;
            }
        };
    }
    ])

    .factory('authorization', ['$rootScope', '$state', 'principal',
        function ($rootScope, $state, principal) {
            return {
                authorize: function () {
                    return principal.identity()
                        .then(function () {
                            var isAuthenticated = principal.isAuthenticated();
                            /*if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0
                             && !principal.isInAnyRole($rootScope.toState.data.roles)) {*/
                            if (isAuthenticated) {
                                // TODO:role check
                                console.log("AUTHORIZATION isAuthenticated = true");
                            } else {
                                console.log("AUTHORIZATION isAuthenticated = false");
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;

                                $state.go('login', {}, {reload: true});
                            }
                            //}
                        }, function () {
                            console.log("Zle logowanie");
                            $state.go('login', {}, {reload: true});
                        });
                }
            };
        }
    ])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var home = {
            name: 'home',
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        };


        var game = {
            name: 'game',
            url: '/game/{gameId}',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'game/game.html',
            controller: 'GameCtrl'
        };

        var games = {
            name: 'games',
            url: '/games',
            templateUrl: 'games/games.html',
            controller: 'GamesCtrl'
        };



        var users = {
            name: 'users',
            url: '/users',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        };
/*
        var allUsers = {
            name: 'allUsers',
            url: '/users',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
        };
*/

        var user_profile = {
            name: 'user_profile',
            url: '/user_profile',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'user_profile/user_profile.html',
            controller: 'UserProfileCtrl'
        };

        var person = {
            name: 'person',
            url: '/person/{personId}',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'person/person.html',
            controller: 'PersonCtrl'
        };

        var favs = {
            name: 'favs',
            url: '/favs',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'favs/favs.html',
            controller: 'FavsCtrl'
        };

        var game_lib = {
            name: 'game_lib',
            url: '/game_lib',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'game_lib/game_lib.html',
            controller: 'GameLibCtrl'
        };

        var friends = {
            name: 'friends',
            url: '/friends',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'friends/friends.html',
            controller: 'FriendsCtrl'
        };

        var notification = {
            name: 'notification',
            url: '/notifications/',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'notification/notification.html',
            controller: 'NotificationCtrl'
        };


        var register = {
            name: 'register',
            url: '/register',
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        };

        var login = {
            name: 'login',
            url: '/login',
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        };

        var logout = {
            name: 'logout',
            url: '/logout',
            onEnter: ['$cookies', '$state', function ($cookies, $state) {
                $cookies.remove('Authorization');
                alert("Wylogowane pomyślnie");
                if ($state.transition) {
                    $state.transition.finally(function () {
                        $state.go('home', {});
                    });
                }
            }],
            controller: 'LogoutCtrl'
        };


        $stateProvider.state(home);

        $stateProvider.state(games);
        $stateProvider.state(game);

        $stateProvider.state(users);
        $stateProvider.state(friends);
        //$stateProvider.state(allUsers);
        $stateProvider.state(person);
        $stateProvider.state(favs);
        $stateProvider.state(game_lib);

        $stateProvider.state(register);
        $stateProvider.state(login);
        $stateProvider.state(logout);
        $stateProvider.state(notification);
        $stateProvider.state(user_profile);
    }
    ])

    .controller('MyAppCtrl', ['$scope', '$rootScope', 'principal', function ($scope, $rootScope, principal) {
        $rootScope.principal = principal;
    }])

    .run(['$rootScope', '$state', '$stateParams',
        'authorization', 'principal',
        function ($rootScope, $state, $stateParams,
                  authorization, principal) {
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toStateParams) {
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;

                    if (principal.isAuthenticated() === false)
                        authorization.authorize();
                });
        }
    ]);