# angular-traceit
*angular-traceit* is an AngularJS Directive for [jquery.traceit.js](https://github.com/yunap/traceit) a jQuery Plugin that lets you trace page elements 

Examples
--------

[angular-traceit examples](http://yunap.github.io/angular-traceit/#/home)


Getting Started:
---------------
(1) Install the plugin into your Angular.js project, manually or via "bower install angular-traceit --save"
(2) Include angular-traceit.js in your index.html, after including Angular itself
(3) Add 'angular-traceit' as a new module dependency in your angular app.

```JavaScript
<script src="/angular/angular.js"></script>
<script src="/jquery/dist/jquery.js"></script>
<script src="/js/raphael.js"></script>
<script src="/js/traceit.js"></script>
<script src="/js/angular-traceit.js"></script>
 
<script>
  var myApp=angular.module('myApp', ['angular-traceit']);
</script>
```

Usage:
------

Apply traceit directive to the element. If you would like to see your element be traced immediately initialize a trace instance with default is-visible option.
If you would like element to not be traced right away initialize a trace instance with 'is-visible' attribute set to false and provide scope variable for trace-toggle attribute, initialize it to false. 

```JavaScript
//initialize with default options
<div id="elementid" traceit >Let's trace this element.</div>

//or set 'is-visible' attribute to false, provide a scope variable for trace-toggle attribute
<h2  id="elementid" is-visible="false" trace-toggle="toggleOne" traceit>Title here.</h2>

```

Then later in your controller you can call reTrace method by setting trace-toggle scope variable to true.

```JavaScript
//Initialize trace-toggle scope variable to false.
$scope.toggleOne = false;
 
//To start animation set trace-toggle scope variable to true
//re-setting $scope.toggleOne to false will hide the trace
$scope.toggleTrace = function(){
   $scope.toggleOne = !$scope.toggleOne
}
```

What can I configure? All options are optional. You can overwrite default trace directive options by providing trace-opt-obj attribute: trace-opt-obj="traceOptEx2". traceOptEx2 is a scope variable which you initialize in your controller.

```JavaScript
//To initialize a trace instance with options object.
//use trace-opt-obj attribute: trace-opt-obj="traceOptEx2"
$scope.traceOptEx2 = {
       'stroke': '#0000ff',
       'stroke-width': 5,
       'stroke-opacity': 1,
       'fill': '#00ff00',
       'fill-opacity': 0.2,
       'gap-point': 'top_left',
       'title': "see, this is example2! Click me."
 };
//onclick Callback
$scope.stuff = function () {
   alert('Triggered from a callback when user clicks on a trace shape.');
   console.log('Triggered from a callback when user clicks on a trace shape.');
};
 
//Following options require separate attributes:
//trace-canvas-padding, redraw-speed, donothideonclick and callback functions:
//onhide, onendtrace & onclick
<div id="example2" class="example2"
     traceit
     is-visible="false"
     trace-opt-obj="traceOptEx2"
     trace-canvas-padding="28"
     redraw-speed="6000"
     donothideonclick="true"
     onclick="stuff()"
     trace-toggle="box2"> Example element </div>
```

You can similarly set new options when triggering reTrace method. Change trace-opt-obj attribute. Then change trace-toggle or retrace-trigger scope variable to trigger the watch function. Difference between trace-toggle and retrace-trigger methods: trace-toggle works as show/hide flag, and will only re-trace the element if watch variable is set to true. retrace-trigger on the other hand will trigger re-trace without consulting the variable value.

```JavaScript

//Use traceit directives on the elements you want to trace
<a class="ghost-button-full-color" ng-click="reTrace(['retrace31','retrace32'])">click to trace</a>
<div id="example31" class="example" traceit
trace-opt-obj="retraceWatchersOptionsObj.retrace31"
retrace-trigger="retraceWatchers.retrace31">
#example3_1</div>
 
<div id="example32" class="example" traceit
trace-opt-obj="retraceWatchersOptionsObj.retrace32"
is-visible="false"
retrace-trigger="retraceWatchers.retrace32">
#example3_2</div>

```

```JavaScript
//Here are the option objects for the elements below.
$scope.retraceWatchersOptionsObj = {
        retrace31: {
          stroke-width: 3,
          stroke-opacity: 1,
          fill: '#0000cc',
          fill-opacity: 0.2
        },
        retrace32: {
          stroke: '#aa0000',
          stroke-width: 4,
          stroke-opacity: 1,
          isVisible: 'true'
        },
};
 
//this is a new options object I use to update
//retraceWatchersOptionsObj.retrace32
$scope.retraceWatchersNewOptionsObj = {
        retrace31: {
          'stroke-width': 2,
          'stroke-opacity': 1,
          'stroke': 'yellow',
          'arrow-end': 'classic-wide-long',
          'isVisible': 'true'
        }
};
 
//this is the function I used to update trace-opt-obj scope variable and trigger the re-trace
$scope.reTrace = function (retraceIDs) {
        retraceIDs.forEach(function (e, index) {
            if( $scope.retraceWatchersNewOptionsObj[e] !== undefined ) {
              angular.forEach( $scope.retraceWatchersNewOptionsObj[e], function(value, key) {
                $scope.retraceWatchersOptionsObj[e][key] = value;
              });
            }
            //trigger re-trace by changing retraceWatchers.retrace32 and retraceWatchers.retrace31
            $scope.retraceWatchers[e] = !$scope.retraceWatchers[e];
        });
};

```

Can I have callbacks? Sure.

```JavaScript
//In controller: declare callback functions
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
 
//in View:
<div id="example40" class="example"  traceit 
     stroke="blue"
     stroke-width="4"
     stroke-opacity="1"
     stroke-dasharray="--.." 
     fill="#00ff00"
     fill-opacity="0.2"
     retrace-trigger="retraceWatchers.retrace4"
     is-visible="false"
     onclick="stuff()"
     onhide="onHide()"
     onendtrace="onEndTrace()"
  > #example40 </div>
  
```


Author
------
Yuna Portnoy / [valleybazaar.org](http://valleybazaar.org/)

Licence
-------

Do what you like, give credit when you can.
