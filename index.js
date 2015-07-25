var express = require('express');
var app = express();
var _ = require('lodash');
app.use(express.bodyParser());

try {
    require('./secret')();
}
catch (e) {
}

var urlMap = require('./api/url-map');
var openSecret = require('./api/get-open');

var db = require('./db');

_.each(urlMap, function( fn, key) {
    app.get(key, function (req, res) {
        db.search(req, function (err, doc) {
            if (!doc) {
                var url = urlMap[req.path](req);
                openSecret(url, function (data) {
                    db.save(req, JSON.stringify(data), function () {
                        res.send(data);
                    });
                });
            } else {
                res.send(JSON.parse(doc.data));
            }
        })
    })
});

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/web/index.html');
});

app.use('/web',express.static(__dirname + '/web'));

var port = Number(process.env.PORT || 5000);
console.log('port', port);
app.listen(port, function() {
  console.log("Listening on " + port);
});