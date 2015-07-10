/* jshint devel:true */
angular
  .module('traceitapp.home', [])
  .controller('HomeCtrl', ['$scope', '$rootScope', '$state', '$location', '$anchorScroll',
    function ($scope, $rootScope, $state, $location, $anchorScroll) {
      'use strict';


      $scope.box1 = $scope.box2 = $scope.box3 = $scope.box4 = false;

      $scope.traceOptions = {
        'stroke-width': 3,
        'stroke-opacity': 1,
        'fill': '#0000cc',
        'fill-opacity': 0.2
      };

      $scope.traceOptEx2 = {
        'stroke': '#0000ff',
        'stroke-width': 5,
        'stroke-opacity': 1,
        'fill': '#00ff00',
        'fill-opacity': 0.2,
        'gap-point': 'top_left',
        'title': 'see, this is example2! Click me.'
      };

      $scope.catListItems = [
        {name: 'Friendly and content', value: 'c1'},
        {name: 'Non-threatening, unsure', value: 'c2'},
        {name: 'Derisive', value: 'c3'},
        {name: 'Friendly but unsure', value: 'c4'},
        {name: 'Amicable, not fearful or aggressive', value: 'c5'},
        {name: 'Defensive aggression', value: 'c6'},
        {name: 'Angry', value: 'c7'},
        {name: 'Potentially aggressive', value: 'c8'},
        {name: 'Submissive', value: 'c9'},
        {name: 'Very happy', value: 'c10'},
        {name: 'Excited, angry or irritable', value: 'c11'},
        {name: 'Alert, interested', value: 'c12'}
      ];

      $scope.catListCheckbox = [];
      //init cat image div ids
      for (var i = 1; i < 13; i++) {
        var id = 'c' + i;
        $scope.catListCheckbox[id] = false;
      }

      $scope.toggleCatMood = function (id) {
        if ($scope.catListCheckbox[id] !== undefined) {
          $scope.catListCheckbox[id] = !$scope.catListCheckbox[id];
        }
      };


      //this is the scope variable being watched
      $scope.retraceWatchers = [{retrace0: true}, {retrace1: true}, {retrace31: true}, {retrace32: true}];

      $scope.retraceWatchersOptionsObj = {
        retrace31: {
          'stroke-width': 3,
          'stroke-opacity': 1,
          'fill': '#0000cc',
          'fill-opacity': 0.2
        },
        retrace32: {
          'stroke': '#aa0000',
          'stroke-width': 4,
          'stroke-opacity': 1,
          'isVisible': 'true'
        },

        retrace1: {
          'stroke': '#00cccc',
          'stroke-width': 3,
          'stroke-opacity': 1,
          isVisible: true
        },

        retrace0: {
          'stroke': '#330044',
          'stroke-width': 3,
          'stroke-opacity': 1,
          isVisible: true
        }
      };

      $scope.retraceWatchersNewOptionsObj = {
        retrace31: {
          'stroke-width': 2,
          'stroke-opacity': 1,
          'stroke': 'yellow',
          'arrow-end': 'classic-wide-long',
          'isVisible': 'true'
        }
      };


      $scope.demoOptions = {isVisible: true};
      $scope.demoOptionsObj = {isVisible: true};

      $scope.traceOptionsNewShape = [
        {
          name: 'gap-point',
          type: 'string',
          description: "[ 'top', 'top_left', 'top_right', 'bottom', 'bottom_left', 'bottom_right' ] or number	0 - 100, where 0 and 100 both mean 'top' (@12 o'clock position), 50 is 'bottom' (@6pm), 25 is 'top_right' (@3pm) etc.",
          //min: "0",
          //max: "100",
          //step: "1"
          dropdownList : [
            {
              'value': 'top',
              'name': 'top'
            },
            {
              'value': 'top_left',
              'name': 'top_left'
            },
            {
              'value': 'top_right',
              'name': 'top_right'
            },
            {
              'value': 'bottom',
              'name': 'bottom'
            },
            {
              'value': 'bottom_left',
              'name': 'bottom_left'
            },
            {
              'value': 'bottom_right',
              'name': 'bottom_right'
            }
          ]
        },
        {
          name: 'traceCanvasPadding',
          type: 'number',
          min: '3',
          max: '50',
          step: '1'
        }
      ];

      $scope.traceOptionsTxt = [
        {
          name: 'arrow-end',
          type: 'string',
          description: 'arrowhead on the end of the path. The format for string is type[-width[-length]]. Possible types: classic, block, open, oval, diamond, none, width: wide, narrow, midium, length: long, short, midium.',
          dropdownList: [
            {
              value: 'none',
              name: 'none'
            },
            {
              value: 'classic-narrow-short',
              name: 'classic-narrow-short'
            },
            {
              value: 'classic-narrow-midium',
              name: 'classic-narrow-midium'
            },
            {
              value: 'classic-midium-midium',
              name: 'classic-midium-midium'
            },
            {
              value: 'block-wide-long',
              name: 'block-wide-long'
            },
            {
              value: 'open-wide-long',
              name: 'open-wide-long'
            },
            {
              value: 'oval-wide-long',
              name: 'oval-wide-long'
            },
            {
              value: 'diamond-wide-long',
              name: 'diamond-wide-long'
            }
          ]
        },
        {
          name: 'traceCursor',
          type: 'string',
          description: 'CSS type of the cursor',
          dropdownList: [
            { value: 'alias', name: 'alias' },
            {
              value: 'cell',
              name: 'cell'
            },
            {
              value: 'copy',
              name: 'copy'
            },
            {
              value: 'crosshair',
              name: 'crosshair'
            },
            {
              value: 'default',
              name: 'default'
            },
            {
              value: 'move',
              name: 'move'
            },
            {
              value: 'not-allowed',
              name: 'not-allowed'
            },
            {
              value: 'pointer',
              name: 'pointer'
            },
            {
              value: 'progress',
              name: 'progress'
            }
          ]
        },
        {
          name: 'fill',
          type: 'string',
          description: 'color, gradient or image',
          color: true
        },
        {
          name: 'fill-opacity',
          type: 'number',
          min: '0',
          max: '1',
          step: '0.1'
        },
        {
          name: 'opacity',
          type: 'number',
          description: '',
          min: '0',
          max: '1',
          step: '0.01'
        },
        {
          name: 'stroke',
          type: 'string',
          description: 'stroke colour',
          color: true
        },
        {
          name: 'stroke-dasharray',
          type: 'string',
          description: "[ '', '-', '.', '-.', '-..', '. ', '- ', '--', '- .', '--.', '--..' ]",
          dropdownList: [
            {
              'value': '',
              'name': ''
            },
            {
              'value': '-',
              'name': '-'
            },
            {
              'value': '.',
              'name': '.'
            },
            {
              'value': '-.',
              'name': '-.'
            },
            {
              'value': '-..',
              'name': '-..'
            },
            {
              'value': '. ',
              'name': '. '
            },
            {
              'value': '- ',
              'name': '- '
            },
            {
              'value': '--',
              'name': '--'
            },
            {
              'value': '- .',
              'name': '- .'
            },
            {
              'value': '-- .',
              'name': '-- .'
            },
            {
              'value': '--..',
              'name': '--..'
            }
          ]
        },
        {
          name: 'stroke-linecap',
          type: 'string',
          description: "['butt', 'square', 'round']",
          dropdownList: [
            {
              'value': 'butt',
              'name': 'butt'
            },
            {
              'value': 'square',
              'name': 'square'
            },
            {
              'value': 'round',
              'name': 'round'
            }
          ]
        },
        {
          name: 'stroke-opacity',
          type: 'number',
          description: '',
          min: '0',
          max: '1',
          step: '0.1'
        },
        {
          name: 'stroke-width',
          type: 'number',
          description: "stroke width in pixels, default is '1'",
          min: '1',
          max: '10',
          step: '1'
        },
        {
          name: 'title',
          type: 'string',
          description: 'will create tooltip with a given text'
        },
        {
          name: 'redrawSpeed',
          type: 'number',
          min: '900',
          max: '10000',
          step: '100'
        }
      ];



      $scope.removediy = false;

      $scope.demoTrace = function () {
        $scope.demoOptions.isVisible = true;
        angular.forEach($scope.demoOptions, function (value, key) {
          $scope.demoOptionsObj[key] = value;
        });

        //toggle watch var
        $scope.box4 = !$scope.box4;
      };


      $scope.onEndDemoTrace = function () {
        //$scope.demo = 'on End Demo Trace';
        console.log('Triggered from DEMO callback when trace animation completes.', $scope.demo);
      };


      //Call back functions
      $scope.onHide = function () {
        alert('This was triggered when hide animation completed.');
        console.log('This was triggered when hide animation completed.');
      };

      $scope.stuff = function () {
        alert('Triggered from a callback when user clicks on a trace shape.');
        console.log('Triggered from a callback when user clicks on a trace shape.');
      };

      $scope.onEndTrace = function () {
        alert('Triggered from a callback when trace animation completes.');
        console.log('Triggered from a callback when trace animation completes.');
      };

      $scope.getNumber = function (num) {
        return new Array(num);
      };


      $scope.reTrace = function (retraceIDs) {
        retraceIDs.forEach(function (e) {
            if( $scope.retraceWatchersNewOptionsObj[e] !== undefined ) {
              angular.forEach( $scope.retraceWatchersNewOptionsObj[e], function(value, key) {
                $scope.retraceWatchersOptionsObj[e][key] = value;
              });
            }

            $scope.retraceWatchers[e] = !$scope.retraceWatchers[e];
        });
      };

      $scope.reTraceAll = function () {
        $rootScope.$broadcast('reTrace', {
          'stroke': 'red',
          'stroke-width': 2,
          'stroke-opacity': 1,
          'arrow-end': 'classic-wide-long',
          'isVisible': 'true'
        });
      };


      $scope.traceRandom = function () {
        if (!$scope.box3) {
          //generate random color // & 0x7f7f7f).toString(16); to select rendom dark colors
          //'#' + (Math.random() * 0xFFFFFF << 0).toString(16),
          $scope.traceOptEx2.stroke = '#' + (Math.random() * 0xffffff << 0).toString(16);
          $scope.traceOptEx2.fill = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
          $scope.traceOptEx2.redrawSpeed = Math.floor(Math.random() * 10000) + 1000;
          $scope.traceOptEx2.traceCanvasPadding = Math.floor((Math.random() * 20) + 9);
        }
        $scope.box3 = !$scope.box3;
      };

      //getting to the element without directive
      $scope.traceTitle = function (id, adjustmentsObject) {
        var el = angular.element(document.querySelector('#' + id));
        //trigger re-trace of a title element
        $(el).triggerHandler(
          {
            type: 'adjust.trace',
            adjustments: adjustmentsObject
          });

      };


      $scope.scrollTo = function( locationId ) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(locationId);

        // call $anchorScroll()
        $anchorScroll();
      };


    }]);
