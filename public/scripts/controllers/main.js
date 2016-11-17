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

    $scope.connected = true;

    if(typeof web3 === 'undefined')
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:4000'));

    if (typeof web3 !== 'undefined') {
  		var abi = web3.eth.contract([ { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "EmailAddress", "type": "string" }, { "name": "Subject", "type": "string" }, { "name": "Message", "type": "string" } ], "name": "SendEmail", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "EmailAddress", "type": "string" }, { "indexed": false, "name": "Subject", "type": "string" }, { "indexed": false, "name": "Message", "type": "string" } ], "name": "EmailSent", "type": "event" } ]);
  		var myContract = abi.at('0x8038FC5f3DdDF44A53b9772925546EdFAcaE503F');
  		var events = myContract.allEvents({fromBlock: 0, toBlock:'latest'});
      console.log(events)

      if (!web3.eth.accounts[0]) {
        $scope.connected = false;
        console.log('not connected to blockchain!')
      } else {
        web3.eth.getBalance(web3.eth.accounts[0],function(err, valuereturned) {
          if(valuereturned<1000000000000000) {
            $scope.insufficientFunds = true;
          }
        })
    		$scope.messages = [];
        $scope.eventData = [];
    		// watch for changes
    		events.watch(function(error, event) {
          console.log(error, event)
          if (!error) {
            $scope.eventData.push(event);
            event.args.message = web3.toAscii(event.args.message);
            console.log($scope.eventData);
            $scope.$apply();
        }
      });
    }



    $rootScope.emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.sendEmail = function () {


      var authorizedAccount = web3.eth.accounts[0],
              outgoingEmail = $scope.outgoingEmail,
                      email = outgoingEmail.emailTo,
                    subject = outgoingEmail.emailSubject,
                    message = outgoingEmail.emailBody,
          SendEmailContract = web3.eth.contract([ { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "EmailAddress", "type": "string" }, { "name": "Subject", "type": "string" }, { "name": "Message", "type": "string" } ], "name": "SendEmail", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "EmailAddress", "type": "string" }, { "indexed": false, "name": "Subject", "type": "string" }, { "indexed": false, "name": "Message", "type": "string" } ], "name": "EmailSent", "type": "event" } ]).at('0x9ee78C86aC32518cBc83d3975EDe44108f04B818');

      console.log(email, subject, message);

      $q.resolve(SendEmailContract.SendEmail(authorizedAccount, email, subject, message, {from: authorizedAccount, gas: 100000})).then(function (err, address) {
          if (err){
            console.log("Aaaaaaaaw snap! You dun goofed! error: " + err)
          } else {
            console.log("Great success!!! :Borat Disco Dance: address - " + address)
          }
      });
  }



  }

  }]);
