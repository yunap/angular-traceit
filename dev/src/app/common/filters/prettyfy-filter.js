
/**
 * Filters
 */

angular.module('prettyprint')
  .filter('prettyprint', function () {
      return function (text) {
        console.log("text", text);
          return prettyPrintOne(text, '', true);
      };
  })

  .filter('fileNames', ['filterByKeys', function (filterByKeys) {
      return function (data) {
          return filterByKeys.startsWith(data, 'filename');
      };
  }])

  .filter('codeSnippets', ['filterByKeys', function (filterByKeys) {
      return function (data) {
          return filterByKeys.startsWith(data, 'code');
      };
}]);


