/*
 * File:   traceit-directive.js
 * Author: Yuna Portnoy
 *
 *
 *
 * Copyright (c) 2015 <yunay@yahoo.com>
 *
 * All rights reserved.
 */

/* jshint devel:true */

angular.module('angular-traceit', [])
  .directive('traceit', function ( $timeout ) {
    'use strict';
    return {
      restrict: 'A',
      scope: {
        isVisible: '=',
        traceOptObj: '=traceOptObj',
        isOpen: "=traceToggle",
        doDelete: "=traceDelete",
        doRetrace: "=retraceTrigger",
        onhide: '&',
        onendtrace: "&",
        onclick: "&"
      },
      link: function (scope, elem, attrs) {

        // will position relative to the document by default
        var useRelativePositioningOpt = true;
        if (!_.isEmpty(attrs.useRelativePositioning)) {
          if (attrs.useRelativePositioning == 'false')
            useRelativePositioningOpt = false;
        }

        var traceCanvasPaddingOpt = 10;
        if (!_.isEmpty(attrs.traceCanvasPadding)) {
          traceCanvasPaddingOpt = parseInt(attrs.traceCanvasPadding);
        }

        var redrawSpeedOpt = 3500;
        if (!_.isEmpty(attrs.redrawSpeed)) {
          redrawSpeedOpt = parseInt(attrs.redrawSpeed);
        }

        var traceCursorOpt = 'pointer';
        if (!_.isEmpty(attrs.traceCursor)) {
          traceCursorOpt = attrs.traceCursor;
        }

        var isVisibleOpt = true;
        if (!_.isEmpty(attrs.isVisible)) {
          if (attrs.isVisible == 'false')
            isVisibleOpt = false;
        }

        var traceOptObj = {};

        if (!_.isEmpty(attrs.traceOptObj)) {
          traceOptObj = scope.traceOptObj;
        }

        if (!_.isEmpty(attrs.stroke)) {
          traceOptObj['stroke'] = attrs.stroke;
        }

        if (!_.isEmpty(attrs.strokeWidth)) {
          traceOptObj['stroke-width'] = parseInt(attrs.strokeWidth);
        }

        if (!_.isEmpty(attrs.strokeOpacity)) {
          traceOptObj['stroke-opacity'] = parseFloat(attrs.strokeOpacity);
        }

        if (!_.isEmpty(attrs.fill)) {
          traceOptObj['fill'] = attrs.fill;
        }

        if (!_.isEmpty(attrs.fillOpacity)) {
          var val = attrs.fillOpacity;
          traceOptObj['fill-opacity'] = parseFloat(val);
        }

        if (!_.isEmpty(attrs.strokeDasharray)) {
          traceOptObj['stroke-dasharray'] = attrs.strokeDasharray;
        }

        if (!_.isEmpty(attrs.gapPoint)) {
          traceOptObj['gap-point'] = attrs.gapPoint;
        }

        if (!_.isEmpty(attrs.zindex)) {
          traceOptObj['zindex'] = parseInt(attrs.zindex);
        }


        var traceInitObj = {
          traceOpt: traceOptObj,
          useRelativePositioning: useRelativePositioningOpt,
          isVisible: isVisibleOpt,
          traceCursor: traceCursorOpt,
          redrawSpeed: redrawSpeedOpt,
          traceCanvasPadding: traceCanvasPaddingOpt
        };

        //onHide : function(trace_shape)
        traceInitObj.onHide = function () {
          if( scope.isOpen != undefined ){
            //if isOpen watch variable is set, let it know that hide
            //just made the shape invisible
            $timeout(function() {
              scope.isOpen = false;
            });
          }

          if (attrs.onhide && angular.isDefined(attrs.onhide)) {
            return scope.onhide();
          }
        };

        //onEndTrace : function
        if (attrs.onendtrace && angular.isDefined(attrs.onendtrace)) {
          traceInitObj.onEndTrace = function () {
            return scope.onendtrace();
          }
        }

        //onClick function, also check a separate flag 'donothideonclick' to see
        //if we do not want to hide the trace on click
        if (attrs.onclick && angular.isDefined(attrs.onclick)) {
          //is there a do not hide on click flag set?
          var hideShape = true;
          if (!_.isEmpty(attrs.donothideonclick)) {
            hideShape = false;
          }

          traceInitObj.onClick = function (me) {
            scope.onclick();
            if (hideShape) {
              me.hideTrace();
            }
          }
        }


        var init = function () {
          $(elem).trace(traceInitObj);
          var inst = $(elem).data('trace');

          scope.$watch('isOpen', function (newVal, oldVal) {
            if (newVal !== oldVal) {
              //if shape had not yet been created
              if (inst == undefined) {
                if ( newVal == true ) { //if show
                  traceInitObj.isVisible = 'true';
                  $(elem).trace({ traceOpt: traceInitObj, useRelativePositioning: true});
                }
              } else {
                if ( newVal == true ) { //if show
                  traceInitObj.traceOpt.isVisible = 'true';
                  inst.reTrace(traceInitObj.traceOpt);
                } else { //if hide
                  $(elem).trigger('hide.trace');
                }
              }
            }
          });

          //doRetrace creates the shape with trace({ traceOpt: traceInitObj, useRelativePositioning: true})
          //or triggers reTrace
          scope.$watch('doRetrace', function (newVal, oldVal) {
            if ( newVal !== oldVal ) {
              traceInitObj.isVisible = 'true';
              //if shape had not yet been created
              if (inst == undefined) {
                  traceInitObj.isVisible = 'true';
                  $(elem).trace({ traceOpt: traceInitObj, useRelativePositioning: true});

              } else {
                  traceInitObj.traceOpt.isVisible = 'true';
                  inst.reTrace(traceInitObj.traceOpt);
              }

              if( scope.isOpen != undefined ){
                //if isOpen watch variable is set, let it know that reTrace just made the shape visible
                scope.isOpen = true;
              }
            }
          }, true);


         // 'delete.trace'
          scope.$watch('doDelete', function (newVal, oldVal) {
            if (newVal !== oldVal) {
              //if shape had not yet been created
              if (inst == undefined) {
                //nothing to do
                return;
              } else {
                 //delete shape
                  $(elem).trigger('delete.trace');
              }
            }
          });

          scope.$on("reTrace", function (e, val) {
            var inst = $(elem).data('trace');
            inst.reTrace(traceInitObj);
          });

          //Update model to reflect view
          //$elem.bind('show.trace'
          //$(elem).on('hide.trace', function(ev) {
            //console.log("hide.trace: ev",ev, "isOpen", scope.isOpen);
          //});
        };

        //wait for dynamically generated element id's etc
        $timeout(init, 0);
      }
    }
  });
