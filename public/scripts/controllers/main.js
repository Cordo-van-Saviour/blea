'use strict';

/**
 * @ngdoc function
 * @name bleaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bleaApp
 */
angular.module('bleaApp')
  .controller('MainCtrl', ['$rootScope', '$scope', '$q', 'emailService', function ($rootScope, $scope, $q, emailService) {
    $rootScope.emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.sendEmail = function () {
      var outgoingEmail = $scope.outgoingEmail;
      emailService.sendEmail(outgoingEmail)
        .then(function(res) {
          console.log(res);
        });
    }


  	console.log($scope);
  }]);
