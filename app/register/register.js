'use strict';

angular.module('myApp.register', [
    'ui.validate',
    'ui.router',
    'vcRecaptcha',
    'myApp'
])

    .controller('RegisterCtrl', function ($scope, $state, vcRecaptchaService) {

        $scope.goto = function () {
            $state.go('home');
        };

        $scope.mySubmit = function (myFields) {
            console.log(myFields.myRecaptchaResponse);
        }

    })

    .directive('noSpaces', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.push(function (inputValue) {

                    var transformedInput = inputValue.replace(/ /g, '');

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    })

    .directive('toLower', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {

                    var transformedInput = inputValue.toLowerCase();

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        }
    });