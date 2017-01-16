'use strict';

angular.module('myApp.notification', [
    'ngRoute',
    'myApp'
])

    .controller('NotificationCtrl', function ($scope, $state, $http, $cookies) {

        $scope.getSentNotifies = function () {
            $http.get('https://pite.herokuapp.com//user', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    $http.get('https://pite.herokuapp.com//friends/pending/sent', {
                        headers: {
                            'Authorization': 'token ' + $cookies.get('Authorization'),
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data) {
                            data.forEach(function (item) {
                                var newFriendId = null;
                                if (item.user_one == response.id)
                                    newFriendId = item.user_two;
                                else if (item.user_two = response.id)
                                    newFriendId = item.user_one;
                                $http.get('https://pite.herokuapp.com//users/' + newFriendId, {
                                    headers: {
                                        'Authorization': 'token ' + $cookies.get('Authorization'),
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .success(function (response) {
                                        item.name = response.username;
                                    });
                            });
                            $scope.notificationsSent = data;
                        })
                        .error(function () {
                            $scope.notificationsSent = [];
                        });
                });
        };

        $scope.getNotifies = function () {
            $http.get('https://pite.herokuapp.com//user', {
                headers: {
                    'Authorization': 'token ' + $cookies.get('Authorization'),
                    'Content-Type': 'application/json'
                }
            })
                .success(function (response) {
                    $http.get('https://pite.herokuapp.com//friends/pending/received', {
                        headers: {
                            'Authorization': 'token ' + $cookies.get('Authorization'),
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data) {
                            data.forEach(function (item) {
                                var newFriendId = null;
                                if (item.user_one == response.id)
                                    newFriendId = item.user_two;
                                else if (item.user_two = response.id)
                                    newFriendId = item.user_one;
                                $http.get('https://pite.herokuapp.com//users/' + newFriendId, {
                                    headers: {
                                        'Authorization': 'token ' + $cookies.get('Authorization'),
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .success(function (response) {
                                        item.name = response.username;
                                    });
                            });
                            $scope.notifications = data;
                        })
                        .error(function () {
                            $scope.notifications = [];
                        });
                });
        };

        $scope.acceptInvitation = function (id) {
            var r = confirm("Add user to your friendship list?");
            if (r == true) {
                $http.get('https://pite.herokuapp.com//friends/pending/accept/' + id, {
                    headers: {
                        'Authorization': 'token ' + $cookies.get('Authorization'),
                        'Content-Type': 'application/json'
                    }
                })
                    .success(function () {
                        alert("You have new friend now!");
                        $state.go($state.current, {}, {reload: true});
                    })
                    .error(function () {
                        alert("Something went wrong");
                    })
            }
        };
    });