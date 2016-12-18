'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ngResource',
    'myApp.home',
    'myApp.register',
    'myApp.login',
    'myApp.games',
    'myApp.game',
    'myApp.users',
    'myApp.person',
    'myApp.typeahead',
    'angular-input-stars',
    'ui.validate'
])

    .factory('principal', ['$q', '$http', '$timeout',
        function ($q, $http, $timeout) {

            var _identity = undefined,
                _authenticated = false;

            return {

                isIdentityResolved: function () {
                    return angular.isDefined(_identity);
                },

                isAuthenticated: function () {
                    return _authenticated;
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

                    if (force === true)
                        _identity = undefined;

                    // check and see if we have retrieved the
                    // identity data from the server. if we have,
                    // reuse it by immediately resolving
                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);

                        return deferred.promise;
                    }

                    // otherwise, retrieve the identity data from the
                    // server, update the identity object, and then
                    // resolve.
                    /*
                     var identiter = $resource('http://yourdomain.com:8000/user', {}, {
                     gett: {
                     method: 'get',
                     headers: {'authorization': 'token 85347a3bda370c2291c772815fd4a3ec7d231a32'}
                     }
                     });

                     identiter.gett({}, function(){console.log("asdasdasdasdas")});
                     .$promise.then(function (user) {
                     console.log(user);
                     }, function (errResponse) {
                     console.log("kurwa");
                     });*/
/*                    $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
                    $http.defaults.headers.common['Authorization'] = 'token e6ca92786ef60fdb5a1c110a76b4507cdca04c9e';
                    $http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';*/
                    $http.get('http://127.0.0.1:8000/user', {
                        headers: {
                            'Authorization': 'token e6ca92786ef60fdb5a1c110a76b4507cdca04c9e',
                            'Content-Type' : 'application/json'
                        }
                    })
                        .success(function (response) {
                            console.log(response);
                        })
                        .error(function (response) {
                            console.log(response);
                        });

                    //           $http.get('/svc/account/identity',
                    //                     { ignoreErrors: true })
                    //                .success(function(data) {
                    //                    _identity = data;
                    //                    _authenticated = true;
                    //                    deferred.resolve(_identity);
                    //                })
                    //                .error(function () {
                    //                    _identity = null;
                    //                    _authenticated = false;
                    //                    deferred.resolve(_identity);
                    //                });

                    // for the sake of the demo, fake the lookup
                    // by using a timeout to create a valid
                    // fake identity. in reality,  you'll want
                    // something more like the $http request
                    // commented out above. in this example, we fake
                    // looking up to find the user is
                    // not logged in

                    /*
                    var self = this;
                    $timeout(function () {
                        self.authenticate(null);
                        deferred.resolve(_identity);
                    }, 1000);
*/
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

                            if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0
                                && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                                if (isAuthenticated) {
                                    // user is signed in but not
                                    // authorized for desired state
                                    $state.go('home');
                                } else {
                                    // user is not authenticated. Stow
                                    // the state they wanted before you
                                    // send them to the sign-in state, so
                                    // you can return them when you're done
                                    $rootScope.returnToState
                                        = $rootScope.toState;
                                    $rootScope.returnToStateParams
                                        = $rootScope.toStateParams;

                                    // now, send them to the signin state
                                    // so they can log in
                                    $state.go('register');
                                }
                            }
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
            templateUrl: 'game/game.html',
            controller: 'GameCtrl'
        };

        var games = {
            name: 'games',
            url: '/games',
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            },
            templateUrl: 'games/games.html',
            controller: 'GamesCtrl'
        };

        var users = {
            name: 'users',
            url: '/users',
            templateUrl: 'users/users.html',
            controller: 'UsersCtrl'
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

        var person = {
            name: 'person',
            url: '/person/{personId}',
            templateUrl: 'person/person.html',
            controller: 'PersonCtrl'
        };

        $stateProvider.state(home);

        $stateProvider.state(games);
        $stateProvider.state(game);

        $stateProvider.state(users);

        $stateProvider.state(register);
        $stateProvider.state(login);
        $stateProvider.state(person);

    }])

    .run(['$rootScope', '$state', '$stateParams',
        'authorization', 'principal',
        function ($rootScope, $state, $stateParams,
                  authorization, principal) {
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toStateParams) {
                    // track the state the user wants to go to;
                    // authorization service needs this
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                    // if the principal is resolved, do an
                    // authorization check immediately. otherwise,
                    // it'll be done when the state it resolved.
                    if (principal.isIdentityResolved())
                        authorization.authorize();
                });
        }
    ]);





