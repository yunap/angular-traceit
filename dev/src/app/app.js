
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
