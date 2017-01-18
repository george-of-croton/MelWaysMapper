var webshot = require('webshot')

var option = {
  screenSize: {
    width: 1000,
    height: 1000
  }
}

webshot('http://www.google.com', 'new5.png', function (err){
  if(err) console.log(err)

})
