/**
 * Directives
 */

function replaceText(str)
{
  var str1 = String(str);
  return str1.replace(/\n/g,"<br/>");
}


angular.module('prettyprint', [])
.directive('prettyPrint', ['$filter', function ($filter){
    return {
        template: '<pre class="prettyprint" ng-bind-html="codePretty"></pre>',
        link: function (scope) {
            console.log("scope.code", scope.code);
            scope.codePretty = $filter('prettyprint')(scope.code);
          console.log("codePretty", scope.codePretty );
        }
    };
}])

  .directive('prettyprint', function( $timeout ) {
  return {
    restrict: 'C',
    link: function postLink(scope, element, attrs) {

      var init = function() {

        element.html(prettyPrintOne(element.html(),'',true));
      };

      $timeout(init, 0);
    }
  };
});
