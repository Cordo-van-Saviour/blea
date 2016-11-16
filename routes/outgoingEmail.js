var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.post('/outgoingEmail', function(req, res, next) {
  console.log(req.body);
  res.status(200).send("Something something dark side");
});

module.exports = router;
