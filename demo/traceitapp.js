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

(function(module) {
try {
  module = angular.module('traceitapp-templates');
} catch (e) {
  module = angular.module('traceitapp-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/traceitapp/home/home.html',
    '<div><nav class="navbar sb_navbar navbar-fixed-top mainmenu" role="navigation"><div class="container"><div class="navbar-header" wsize><button type="button" id="topNavBtn" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-sb"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a href="#top" class="navbar-brand brand-title" ng-show="windowWidth > 420">AngularJs traceit directive</a> <a href="#top" class="navbar-brand brand-title" ng-show="windowWidth < 420">angular-traceit</a></div><div style="height: auto" class="navbar-collapse collapse" id="navbar-collapse-sb"><ul class="nav navbar-nav pull-right"><li><a ng-click="scrollTo(\'GettingStarted\')">Getting Started</a></li><li><a ng-click="scrollTo(\'diy\')">DIY</a></li></ul></div></div></nav></div><div class="img-cover"><h2 class="text-center title wcolor_green" id="to_test" traceit is-visible="false" stroke="#330044" redrawspeed="50000" retrace-trigger="retraceWatchers.retrace0" trace-toggle="box1">traceit SandBox</h2><div class="row no-gutter"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 trace_title_txt"><span class="trace_page_kw wcolor_terracotta">angular-traceit</span> is an AngularJS Directive for <span class="trace_page_kw wcolor_blue margin-right-small">traceit.js</span> - a jQuery Plugin that lets you trace page elements.<p class="top-spacer">Check it out <a type="button" id="tracediv" class="ghost-button-full-color" ng-click="reTrace([\'retrace0\'])">Trace the Title</a> <a type="button" class="ghost-button-full-color" ng-click="box1=!box1">Toggle</a></p></div></div></div><div class="container"><div class="theme-invert"><div class="trace_background"><div class="row"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 trace_page_txt"><h4>Are you\'re looking for a way to provide your user with a visual cue? Tracing part of an image can do this. To see it in action, select a cat mood from the list below :</h4></div></div><div class="row"><div class="col-lg-offset-1 col-lg-6 col-md-8 col-sm-8 col-xs-12 text-center"><div class="well"><div class="overlay"><div ng-repeat="i in getNumber(12) track by $index" id="tail_c{{$index + 1}}" traceit is-visible="false" trace-toggle="catListCheckbox[\'c\' + ($index + 1)]"></div></div><img class="fill_clmn img-responsive" src="/assets/img/tailcats.jpg" alt=""></div></div><div class="col-lg-offset-1 col-lg-4 col-md-offset-1 col-md-3 col-sm-4 col-xs-12 text-left"><div class="well"><ul class="list-group checked-list-box"><li ng-repeat="item in catListItems" class="list-group-item" ng-class="{\'list-group-item-primary active\': catListCheckbox[item.value] === true}" id="item.value"><span class="state-icon" ng-click="toggleCatMood(item.value)" ng-class="{\'glyphicon glyphicon-check\': catListCheckbox[item.value] === true,\n' +
    '                                   \'glyphicon glyphicon-unchecked\': catListCheckbox[item.value] === false}"></span>{{item.name}}<input class="hidden" type="checkbox" ng-model="catListCheckbox[item.value]"></li></ul></div></div></div></div><hr class="hr-spacer" id="GettingStarted"><div class="trace_background"><div class="row"><div class="col-md-10 col-lg-10 col-sm-12 col-xs-12 col-md-offset-1 col-lg-offset-1"><h2>Getting Started</h2></div></div><div class="row example_text"><div class="col-md-10 col-lg-10 col-sm-12 col-xs-12 col-md-offset-1 col-lg-offset-1 trace_page_txt"><p class="examples">How to Install / Usage<br>(1) Install the plugin into your Angular.js project, manually or via "bower install angular-traceit --save"<br>(2) Include angular-traceit.js (or angular-traceit.min.js) in your index.html, after including Angular itself<br>(3) Add \'angular-traceit\' as a new module dependency in your angular app.<br></p><div class="primary-content"><pre class="prettyprint">\n' +
    '&lt;script src="/angular/angular.js"&gt;&lt;/script&gt;\n' +
    '&lt;script src="/jquery/dist/jquery.js"&gt;&lt;/script&gt;\n' +
    '&lt;script src="/js/raphael.js"&gt;&lt;/script&gt;\n' +
    '&lt;script src="/js/traceit.js"&gt;&lt;/script&gt;\n' +
    '&lt;script src="/js/angular-traceit.js"&gt;&lt;/script&gt;\n' +
    '\n' +
    '&lt;script&gt;\n' +
    '  var myApp=angular.module(\'myApp\', [\'angular-traceit\']);\n' +
    '&lt;/script&gt;</pre></div><p class="examples">Apply the directive to your element. If you would like to see your element be traced immediately initialize a trace instance with default options.</p><div class="primary-content"><pre class="prettyprint">\n' +
    '&lt;div id="elementid" traceit &gt;Let\'s trace this element.&lt;/div&gt;\n' +
    '              </pre></div><p class="examples">If you would like element to not be traced right away initialize a trace instance with \'is-visible\' attribute set to false and providing scope variable for trace-toggle attribute, initialize it to false. Then later in your controller you can call reTrace method by setting trace-toggle scope variable to true.</p><div class="primary-content"><pre class="prettyprint">\n' +
    '//Set \'is-visible\' attribute to false, provide a scope variable for trace-toggle attribute\n' +
    '&lt;h2  id="elementid" is-visible="false" trace-toggle="toggleOne" traceit&gt;Title here.&lt;/h2&gt;\n' +
    '</pre></div><br><div class="primary-content"><pre class="prettyprint">\n' +
    '//Initialize trace-toggle scope variable to false.\n' +
    '$scope.toggleOne = false;\n' +
    '\n' +
    '//To start animation set trace-toggle scope variable to true\n' +
    '//re-setting $scope.toggleOne to false will hide the trace\n' +
    '$scope.toggleTrace = function(){\n' +
    '   $scope.toggleOne = !$scope.toggleOne\n' +
    '}\n' +
    '            </pre></div><div class="trace_example_content"><p class="examples">To trace or toggle this element <a id="trace_example" class="ghost-button-full-color" ng-click="box2 = !box2">click here</a>.</p><div id="example" class="example" traceit is-visible="false" trace-toggle="box2">#example</div></div><p class="examples">What can I configure? All options are optional. You can overwrite default trace directive options by providing trace-opt-obj attribute: trace-opt-obj="traceOptEx2". traceOptEx2 is a scope variable which you initialize in your controller.</p><div class="primary-content"><pre class="prettyprint">\n' +
    '//To initialize a trace instance with options object.\n' +
    '//use trace-opt-obj attribute: trace-opt-obj="traceOptEx2"\n' +
    '$scope.traceOptEx2 = {\n' +
    '       \'stroke\': \'#0000ff\',\n' +
    '       \'stroke-width\': 5,\n' +
    '       \'stroke-opacity\': 1,\n' +
    '       \'fill\': \'#00ff00\',\n' +
    '       \'fill-opacity\': 0.2,\n' +
    '       \'gap-point\': \'top_left\',\n' +
    '       \'title\': "see, this is example2! Click me."\n' +
    ' };\n' +
    '//onclick Callback\n' +
    '$scope.stuff = function () {\n' +
    '   alert(\'Triggered from a callback when user clicks on a trace shape.\');\n' +
    '   console.log(\'Triggered from a callback when user clicks on a trace shape.\');\n' +
    '};\n' +
    '\n' +
    '//Following options require separate attributes:\n' +
    '//trace-canvas-padding, redraw-speed, donothideonclick and callback functions:\n' +
    '//onhide, onendtrace & onclick\n' +
    '&lt;div id="example2" class="example2"\n' +
    '     traceit\n' +
    '     is-visible="false"\n' +
    '     trace-opt-obj="traceOptEx2"\n' +
    '     trace-canvas-padding="28"\n' +
    '     redraw-speed="6000"\n' +
    '     donothideonclick="true"\n' +
    '     onclick="stuff()"\n' +
    '     trace-toggle="box2"&gt; Example element &lt;/div&gt;\n' +
    '            </pre></div><div class="trace_example_content"><p class="examples"><a id="trace_example2" class="ghost-button-full-color" ng-click="traceRandom()">click to toggle</a>.</p><div class="row no-gutter"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><p>Clicking on the button above will update stroke, fill, redrawSpeed and traceCanvasPadding options with randomly generated values.</p><pre><code>trace-opt-obj = {{traceOptEx2 | json}}</code></pre></div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="text-center bottom-spacer">The ellement below will get traced.<br></div><div id="example2" class="example2" traceit is-visible="false" trace-opt-obj="traceOptEx2" trace-canvas-padding="28" redraw-speed="6000" donothideonclick="true" onclick="stuff()" trace-toggle="box3">#example2</div></div></div></div><p class="examples">You can similarly set new options when triggering reTrace method. Change trace-opt-obj attribute. Then change trace-toggle or retrace-trigger scope variable to trigger the watch function. Difference between trace-toggle and retrace-trigger methods: trace-toggle works as show/hide flag, and will only re-trace the element if watch variable is set to true. retrace-trigger on the other hand will trigger re-trace without consulting the variable value.</p><div class="primary-content"><pre class="prettyprint">\n' +
    '//Use traceit directives on the elements you want to trace\n' +
    '&lt;a class="ghost-button-full-color" ng-click="reTrace([\'retrace31\',\'retrace32\'])"&gt;click to trace&lt;/a&gt;\n' +
    '&lt;div id="example31" class="example" traceit\n' +
    'trace-opt-obj="retraceWatchersOptionsObj.retrace31"\n' +
    'retrace-trigger="retraceWatchers.retrace31"&gt;\n' +
    '#example3_1&lt;/div&gt;\n' +
    '\n' +
    '&lt;div id="example32" class="example" traceit\n' +
    'trace-opt-obj="retraceWatchersOptionsObj.retrace32"\n' +
    'is-visible="false"\n' +
    'retrace-trigger="retraceWatchers.retrace32"&gt;\n' +
    '#example3_2&lt;/div&gt;\n' +
    '            </pre></div><p class="examples">In controller</p><div class="primary-content"><pre class="prettyprint">\n' +
    '//Here are the option objects for the elements below.\n' +
    '$scope.retraceWatchersOptionsObj = {\n' +
    '        retrace31: {\n' +
    '          stroke-width: 3,\n' +
    '          stroke-opacity: 1,\n' +
    '          fill: \'#0000cc\',\n' +
    '          fill-opacity: 0.2\n' +
    '        },\n' +
    '        retrace32: {\n' +
    '          stroke: \'#aa0000\',\n' +
    '          stroke-width: 4,\n' +
    '          stroke-opacity: 1,\n' +
    '          isVisible: \'true\'\n' +
    '        },\n' +
    '};\n' +
    '\n' +
    '//this is a new options object I use to update\n' +
    '//retraceWatchersOptionsObj.retrace32\n' +
    '$scope.retraceWatchersNewOptionsObj = {\n' +
    '        retrace31: {\n' +
    '          \'stroke-width\': 2,\n' +
    '          \'stroke-opacity\': 1,\n' +
    '          \'stroke\': \'yellow\',\n' +
    '          \'arrow-end\': \'classic-wide-long\',\n' +
    '          \'isVisible\': \'true\'\n' +
    '        }\n' +
    '};\n' +
    '\n' +
    '//this is the function I used to update trace-opt-obj scope variable and trigger the re-trace\n' +
    '$scope.reTrace = function (retraceIDs) {\n' +
    '        retraceIDs.forEach(function (e, index) {\n' +
    '            if( $scope.retraceWatchersNewOptionsObj[e] !== undefined ) {\n' +
    '              angular.forEach( $scope.retraceWatchersNewOptionsObj[e], function(value, key) {\n' +
    '                $scope.retraceWatchersOptionsObj[e][key] = value;\n' +
    '              });\n' +
    '            }\n' +
    '            //trigger re-trace by changing retraceWatchers.retrace32 and retraceWatchers.retrace31\n' +
    '            $scope.retraceWatchers[e] = !$scope.retraceWatchers[e];\n' +
    '        });\n' +
    '};\n' +
    '\n' +
    '            </pre></div><div class="trace_example_content"><p class="examples"><a id="trace_example3" class="ghost-button-full-color" ng-click="reTrace([\'retrace31\',\'retrace32\'])">click to trace</a></p><div id="example31" class="example" traceit trace-opt-obj="retraceWatchersOptionsObj.retrace31" retrace-trigger="retraceWatchers.retrace31">#example3_1</div><span id="example32" traceit is-visible="false" trace-opt-obj="retraceWatchersOptionsObj.retrace32" retrace-trigger="retraceWatchers.retrace32" class="example3span">#example3_2</span></div><br><p class="examples">Can I have callbacks? Sure.</p><div class="primary-content"><pre class="prettyprint">\n' +
    '//In controller: declare callback functions\n' +
    '$scope.onHide = function () {\n' +
    '   alert(\'This was triggered when hide animation completed.\');\n' +
    '   console.log(\'This was triggered when hide animation completed.\');\n' +
    '};\n' +
    '\n' +
    '$scope.stuff = function () {\n' +
    '   alert(\'Triggered from a callback when user clicks on a trace shape.\');\n' +
    '   console.log(\'Triggered from a callback when user clicks on a trace shape.\');\n' +
    '};\n' +
    '\n' +
    '$scope.onEndTrace = function () {\n' +
    '   alert(\'Triggered from a callback when trace animation completes.\');\n' +
    '   console.log(\'Triggered from a callback when trace animation completes.\');\n' +
    '};\n' +
    '\n' +
    '//in View:\n' +
    '&lt;div id="example40" class="example"  traceit \n' +
    '     stroke="blue"\n' +
    '     stroke-width="4"\n' +
    '     stroke-opacity="1"\n' +
    '     stroke-dasharray="--.." \n' +
    '     fill="#00ff00"\n' +
    '     fill-opacity="0.2"\n' +
    '     retrace-trigger="retraceWatchers.retrace4"\n' +
    '     is-visible="false"\n' +
    '     onclick="stuff()"\n' +
    '     onhide="onHide()"\n' +
    '     onendtrace="onEndTrace()"\n' +
    '  &gt; #example40 &lt;/div&gt;\n' +
    '</pre></div><div class="trace_example_content"><p class="examples"><a id="trace_example4" class="ghost-button-full-color" ng-click="reTrace([\'retrace4\'])">click to re-trace</a> to call onClick callback function click on the shape.</p><div id="example40" class="example" traceit stroke="blue" stroke-width="4" stroke-opacity="1" stroke-dasharray="--.." fill="#00ff00" fill-opacity="0.2" retrace-trigger="retraceWatchers.retrace4" is-visible="false" onclick="stuff()" onhide="onHide()" onendtrace="onEndTrace()">#example40</div></div><p class="examples">Resizing a window or pressing the escape key will redraw all the visible traces.</p><p class="examples">The list of trace options.</p><div class="primary-content"><pre class="prettyprint prettyprinted"><span class="com">/********************************************************************************************************************\n' +
    'arrow-end		string		arrowhead on the end of the path. The format for string is\n' +
    '					type[-width[-length]].\n' +
    '					Possible types: classic, block, open, oval, diamond, none,\n' +
    '					width: wide, narrow, midium,\n' +
    '					length: long, short, midium.\n' +
    'cursor			string		CSS type of the cursor\n' +
    'fill			string 		colour, gradient or image\n' +
    'fill-opacity		number\n' +
    'gap-point		string		["top","top_left","top_right","bottom","bottom_left","bottom_right"]\n' +
    '			or number	0 - 100, where 0 and 100 both mean "top" (@12 o\'clock position), 50 is "bottom" (@6pm),\n' +
    '							25 is "top_right" (@3pm) etc.\n' +
    'opacity			number\n' +
    'stroke			string 		stroke colour\n' +
    'stroke-dasharray		string 		[“”, “-”, “.”, “-.”, “-..”, “. ”, “- ”, “--”, “- .”, “--.”, “--..”]\n' +
    'stroke-linecap		string 		[“butt”, “square”, “round”]\n' +
    'stroke-opacity		number\n' +
    'stroke-width		number 		stroke width in pixels, default is \'1\'\n' +
    'title 			string 		will create tooltip with a given text\n' +
    '**********************************************************************************************************************/</span></pre></div></div></div></div><hr class="hr-spacer" id="diy"><div class="trace_background"><div class="row"><div class="col-md-10 col-lg-10 col-sm-12 col-xs-12 col-md-offset-1 col-lg-offset-1"><h2>DIY</h2></div></div><div class="row example_text"><div class="col-md-10 col-lg-10 col-sm-12 col-xs-12 col-md-offset-1 col-lg-offset-1 trace_page_txt"><p class="examples">Try it out. Choose the options in the table below, then click to re-trace. "gap-point" and "traceCanvasPadding" options can only be set on a new shape. To see them change remove the existing shape first, then select the options below and trace the element again. <a class="ghost-button-full-color" ng-click="demoTrace()">Click to re-trace</a> <a class="ghost-button-full-color" ng-click="removediy = !removediy">remove</a></p><p class="examples"><div class="trace_example_content"><div class="row"><div class="col-lg-5 col-md-5 col-sm-5 col-xs-12"><div class="options-table-first"><div class="row no-gutter" ng-class="{\'first-bg\' : $index%2, \'second-bg\' : !($index%2)}" ng-repeat="option in traceOptionsNewShape"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">{{option.name}}</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 align-right"><div ng-if="option.step"><input name="{{option.name}}" type="number" class="form-control number-stepper" ng-model="demoOptions[option.name]" min="{{option.min}}" max="{{option.max}}" step="{{option.step}}"></div><div ng-if="option.dropdownList"><select class="form-control" ng-model="demoOptions[option.name]" ng-options="item.value as item.name for item in option.dropdownList"><option value="">select</option></select></div></div></div></div><div class="options-table"><div class="row no-gutter" ng-class="{\'first-bg\' : $index%2, \'second-bg\' : !($index%2)}" ng-repeat="option in traceOptionsTxt"><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">{{option.name}}</div><div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 align-right"><div ng-if="option.step"><input name="{{option.name}}" type="number" class="form-control number-stepper" ng-model="demoOptions[option.name]" min="{{option.min}}" max="{{option.max}}" step="{{option.step}}"></div><div ng-if="option.dropdownList"><select class="form-control" ng-model="demoOptions[option.name]" ng-options="item.value as item.name for item in option.dropdownList" id="role"><option value="">select</option></select></div><div ng-if="option.color"><input colorpicker="rgba" colorpicker-position="top" class="form-control" ng-model="demoOptions[option.name]"></div><div ng-if="option.step == undefined && option.dropdownList == undefined && option.color == undefined"><input name="{{option.name}}" class="form-control" ng-model="demoOptions[option.name]"></div></div></div></div></div><div class="col-lg-7 col-md-7 col-sm-7 col-xs-12"><div class="row example-diy"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><pre><code>trace-opt-obj = {{demoOptionsObj | json }}</code></pre></div></div><div class="row example-diy"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"><div id="example50" class="exampleDIY" traceit trace-opt-obj="demoOptionsObj" is-visible="false" trace-canvas-padding="20" redraw-speed="4000" onendtrace="onEndDemoTrace()" retrace-trigger="box4" trace-delete="removediy">#DIY example</div></div></div></div></div></div></p></div></div></div></div></div><div id="canvas_container"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('traceitapp-templates');
} catch (e) {
  module = angular.module('traceitapp-templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/traceitapp/common/services/modal-service/modalService.html',
    '<div class="modal-header"><h3>{{modalOptions.headerText}}</h3></div><div class="modal-body"><p>{{modalOptions.bodyText}}</p></div><div class="modal-footer"><button type="button" class="btn" data-ng-click="modalOptions.close()">{{modalOptions.closeButtonText}}</button> <button class="btn btn-primary" data-ng-click="modalOptions.ok();">{{modalOptions.actionButtonText}}</button></div>');
}]);
})();


angular.module('traceitapp', [
  'traceitapp-templates', 'traceitapp.home', 'angular-traceit', 'prettyprint',
   'ui.router', 'ngAnimate', 'ui.bootstrap','colorpicker.module'
])
.config(function ($stateProvider, $urlRouterProvider ) {
  'use strict';


        $urlRouterProvider.otherwise('/home');

        $stateProvider

            //
            .state('traceit-start', {
                url: '/home',
                templateUrl: '/traceitapp/home/home.html',
                controller: 'HomeCtrl',
                data: {
                    FormData: {}
                }
            });


    });

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



angular.module('traceitapp.home').service('modalService', ['$modal',
    function ($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: '/treaceitapp/common/services/modal-service/modalService.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function (result) {
                        $modalInstance.close(result);
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                }
            }

            return $modal.open(tempModalDefaults).result;
        };

    }]);
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
