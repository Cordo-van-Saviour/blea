var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Web3 = require('web3');
var nodemailer = require('nodemailer');

require('ssl-root-cas').inject();




/*
*-------------------------------------------*
*--------- Listening for an email ----------*
*-------------------------------------------*
Lorem ipsum dolor sit amet, consectetur elit,
sed do eiusmod tempor incididunt ut laboresen
dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nis
i ut aliquip ex ea commodo consequat duis ute
*/

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var abi = web3.eth.contract([ { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "EmailAddress", "type": "string" }, { "name": "Subject", "type": "string" }, { "name": "Message", "type": "string" } ], "name": "SendEmail", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x5404a9984a11b67e89ac29880161a2c896f0b59b" } ], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Sender", "type": "address" }, { "indexed": false, "name": "EmailAddress", "type": "string" }, { "indexed": false, "name": "Subject", "type": "string" }, { "indexed": false, "name": "Message", "type": "string" } ], "name": "EmailSent", "type": "event" } ]),
contractAddress = '0xBD2D1b143276173dBfC6f57d6cBbCE575eC54326',
     myContract = abi.at(contractAddress);
         events = myContract.allEvents({fromBlock: 0, toBlock:'latest'});


console.log("Eth Node Version: ", web3.version.node);
console.log("Network: " ,web3.version.network, web3.version.ethereum);
console.log("Connected: ", web3.isConnected(), web3.currentProvider);
console.log("syncing: ", web3.eth.syncing, ", Latest Block: ",web3.eth.blockNumber);
console.log("Accounts[0]: " , web3.eth.accounts[0], ":",web3.eth.getBalance(web3.eth.accounts[0]).toNumber())
console.log(new Date());
console.log("listening for events on ", contractAddress);



// watch for changes
events.watch(function(error, event) {

  if (!error) {
    var smtpConfig = {
      host: 'smtp.klotfrket.co',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'uros.radovanovic@klotfrket.co',
        pass: '123456'
      }
    };


    var transporter = nodemailer.createTransport(smtpConfig);

    transporter.verify(function(error, success) {
      if (error) {
        console.log("Something went wrong, but it's going to be ok. " + error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });


    var mailOptions = {
      from: event.args.Sender + '@testmail.co', // sender address
      to: 'uros.radovanovic@klotfrket.co', // list of receivers. TODO: ATM hardcoded, should be: event.args.EmailAddress
      subject: event.args.Subject, // Subject line
      text: event.args.Message, // plaintext body
      // html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    // transporter.sendMail(mailOptions, function(error, info){
    //   if(error){
    //     return console.log(error);
    //   }
    //   console.log('Message sent: ' + info.response);
    // });
  }
  else {
    console.log("error!!!!");
  }
})
