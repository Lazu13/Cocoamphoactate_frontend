'use strict';

angular.module('myApp.register', [
    'ui.validate',
    'ui.router',
    'myApp'
])

    .controller('RegisterCtrl', function ($scope, $state) {

        $scope.goto = function () {
            $state.go('home');
        }

    })

    // Directive thanks to stack and pkozlowski.opensource (with small modification)
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

    // Directive thanks to stack and pkozlowski.opensource (with small modification)
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