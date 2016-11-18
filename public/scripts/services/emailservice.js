'use strict';

/**
 * @ngdoc service
 * @name bleaApp.emailService
 * @description
 * # emailService
 * Service in the bleaApp.
 */
angular.module('bleaApp')
  .service('emailService', ['$http', function ($http, $q) {
    var API_PATH = 'http://localhost:4000/',
    emailService = {};

    emailService.sendEmail = function(outgoingEmail) {
      var authorizedAccount = web3.eth.accounts[0],
                      email = outgoingEmail.emailTo,
                    subject = outgoingEmail.emailSubject,
                    message = outgoingEmail.emailBody,
          SendEmailContract = web3.eth.contract([ { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "EmailAddress", "type": "string" }, { "name": "Subject", "type": "string" }, { "name": "Message", "type": "string" } ], "name": "SendEmail", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Sender", "type": "address" }, { "indexed": false, "name": "EmailAddress", "type": "string" }, { "indexed": false, "name": "Subject", "type": "string" }, { "indexed": false, "name": "Message", "type": "string" } ], "name": "EmailSent", "type": "event" } ] ).at('0x9ee78C86aC32518cBc83d3975EDe44108f04B818');

         console.log(email, subject, message);

      // var response = myContractInstance.SendEmail(email, subject, message, {from: authorizedAccount, value: 80000000000000000}, function (err, address) {
      //   if (err){
      //     console.log("Aaaaaaaaw snap! You dun goofed! error: " + err)
      //   } else {
      //     console.log("Great success!!! :Borat Disco Dance: address - " + address)
      //   }
      // })

      SendEmailContract.SendEmail(email, subject, message, {from: authorizedAccount});

      // return ({
      //   myContractInstance.SendEmail(email, subject, message, {from: authorizedAccount, value: 80000000000000000}, function(err, address) {
      //     if (err){
      //       console.log("Aaaaaaaaw snap! You dun goofed! error: " + err)
      //     } else {
      //       console.log("Great success!!! :Borat Disco Dance: address - " + address)
      //     }
      //   })
      // });


      // return $http({
      //     method: 'POST',
      //     url: API_PATH + 'outgoingEmail',
      //     data: {
      //       outgoingEmail: outgoingEmail
      //     }
      //   })
      //   .then(function(response) {
      //     return response.data;
      //   })
      //   .catch(function(response) {
      //     console.error("Bad http response");
      //   });
    }

    return emailService;
  }]);
