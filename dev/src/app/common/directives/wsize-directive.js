/**
 * Directives
 */

angular.module('traceitapp.home')
  .directive('wsize', function ($window) {
  	'use strict';
    return function (scope) {

      scope.getWindowDimensions = function () {
        return {
          'h': $window.innerHeight,
          'w': $window.innerWidth
        };
      };

      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;
      }, true);

      angular.element($window).bind('resize', function () {
        scope.$apply();
      });
    };
  });
