'use strict';

/**
 * @ngdoc service
 * @name bleaApp.emailService
 * @description
 * # emailService
 * Service in the bleaApp.
 */
angular.module('bleaApp')
  .service('emailService', ['$http', function ($http) {
    var API_PATH = 'http://localhost:3000/',
    emailService = {};

    emailService.sendEmail = function(e) {
      console.log(e);
      return $http({
          method: 'POST',
          url: API_PATH + 'outgoingEmail',
          data: {
            outgoingEmail: e
          }
        })
        .then(function(response) {
          return response.data;
        })
        .catch(function(response) {
          console.error("Bad http response");
        });
    }

    return emailService;
    // AngularJS will instantiate a singleton by calling "new" on this function
  }]);
