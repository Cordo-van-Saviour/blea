var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var index = require('./routes/index');
var users = require('./routes/users');
var outgoingEmail = require('./routes/outgoingEmail');

var app = express();

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', index);
app.get('/users', users);
app.post('/outgoingEmail', outgoingEmail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





var optionsABI = [[ { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "EmailAddress", "type": "string" }, { "name": "Subject", "type": "string" }, { "name": "Message", "type": "string" } ], "name": "SendEmail", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xa03a414e8286e9c089ff6cc03a9230a70fdca0f4" } ], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Sender", "type": "address" }, { "indexed": false, "name": "EmailAddress", "type": "string" }, { "indexed": false, "name": "Subject", "type": "string" }, { "indexed": false, "name": "Message", "type": "string" } ], "name": "EmailSent", "type": "event" } ]]
var contractAddress = "0x752b9619479F605a98EE04e213b96B1f15748119"



var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

console.log("Eth Node Version: ", web3.version.node);
//console.log("Network: " ,web3.version.network, web3.version.ethereum);
console.log("Connected: ", web3.isConnected(), web3.currentProvider);
console.log("syncing: ", web3.eth.syncing, ", Latest Block: ",web3.eth.blockNumber);
console.log("Accounts[0]: " , web3.eth.accounts[0], ":",web3.eth.getBalance(web3.eth.accounts[0]).toNumber())

OptionsContract = initContract(optionsABI, contractAddress)



function initContract(contractAbi, contractAddress) {
  var MyContract = web3.eth.contract(contractAbi);
  var contractInstance = MyContract.at(contractAddress);
  var event = contractInstance.allEvents()
  console.log("listening for events on ", contractAddress)
  // watch for changes
  event.watch(function(error, result){ //This is where events can trigger changes in UI
    if (!error)
      console.log(result);
  });
  return contractInstance
}







module.exports = app;
