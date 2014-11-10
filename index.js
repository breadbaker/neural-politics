var express = require('express');
var app = express();
app.use(express.bodyParser());

var check = require('./api/opensecret');

// app.get('/css/moolah.css', function(req, res) {
//   res.sendfile(__dirname + '/css/moolah.css');
// });
app.post('/getLegislators', require('./api/get-legislators'));
app.post('/get-contributors', require('./api/get-contributors'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/web/index.html');
});

app.use('/web',express.static(__dirname + '/web'));

var port = Number(process.env.PORT || 5000);
console.log('port', port);
app.listen(port, function() {
  console.log("Listening on " + port);
});