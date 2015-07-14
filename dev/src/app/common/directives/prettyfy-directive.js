/**
 * Code Print Directives
 */

angular.module('prettyprint', [])
.directive('prettyPrint', ['$filter', function ($filter){
	'use strict';
    return {
        template: '<pre class="prettyprint" ng-bind-html="codePretty"></pre>',
        link: function (scope) {
            scope.codePretty = $filter('prettyprint')(scope.code);
        }
    };
}])

  .directive('prettyprint', ['$timeout', function( $timeout ) {
  	'use strict';
  return {
    restrict: 'C',
    link: function postLink(scope, element, attrs) {

      var init = function() {

        element.html(prettyPrintOne(element.html(),'',true));
      };

      $timeout(init, 0);
    }
  };
}]);
