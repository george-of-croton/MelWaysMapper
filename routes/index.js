var express = require('express');
var router = express.Router();
var webshot = require('webshot')
var fs = require('fs')
var url = 'http://localhost:3000/coords/'


// * GET home page. */
router.get('/', function(req, res, next) {
  res.send('Follow the white rabbit');
  console.log(req.body)
});

router.get('/first/:lat/:lng', function (req, res, next) {
  webshot('google.com', 'boom!.png', function (err){
    if(err) console.log(err)
    console.log("weehee!")
  })
  res.send("this is what happens")
})

router.get('/:lat/:lng', function(req, res, next) {
  var coords = req.params
  res.render('map', coords)
})

module.exports = router;
