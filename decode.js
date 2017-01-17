var request = require('request')
var fs = require('fs')

request.get('http://localhost:3000/coords/first/-37.813628/144.963058', function(error, response, body) {
  if(!error && response.statusCode == 200) {
    console.log(body)
    fs.open(body, 'r', (err, fd) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.error('myfile does not exist');
          return;
        } else {
          throw err;
        }
      }

      readMyData(fd);
    });
      }
    })
