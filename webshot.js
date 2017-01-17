var webshot = require('webshot')

var option = {
  screenSize: {
    width: 1000,
    height: 1000
  }
}

webshot('http://localhost:3000/coords/-37.813628/144.963058', 'new5.png', function (err){
  if(err) console.log(err)

})
