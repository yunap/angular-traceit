/**
 * Services
 */

angular.module('prettyprint')
.factory('filterByKeys', function () {
    return {
        startsWith: function (data, str) {
            if (typeof data === 'object') {
                var filteredData = Object.keys(data).filter(function (k) {
                    return k.indexOf(str) === 0;
                }).reduce(function (newData, k) {
                    newData[k] = data[k];
                    console.log("newData", newData);
                    return newData;
                }, {});
              console.log("filteredData", filteredData);
                return filteredData;
            }
        }
    };
});
