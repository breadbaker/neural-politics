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

var Twitter = require('twitter');

var addProfiles = function (data, callback) {
    var twitterConfig = {
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_TOKEN_SECRET,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        consumer_key: process.env.TWITTER_CONSUMER_KEY
    };

    var client = new Twitter(twitterConfig);
    var done = _.after(data.legislator.length, callback);

    _.each(data.legislator, function (legislator) {
        client.get('users/show', { screen_name: legislator.$.twitter_id }, function (error, profile, response) {
            if (error) {
                legislator.$.profileImage
            } else {
                legislator.$.profileImage = profile['profile_image_url'].replace('_normal', '_400x400');
            }
            done();
        });
    })
}

_.each(urlMap, function( fn, key) {
    app.get(key, function (req, res) {
        db.search(req, function (err, doc) {
            if (!doc) {
                var url = urlMap[req.path](req);
                openSecret(url, function (data) {
                    try {
                        var done = function () {
                            db.save(req, JSON.stringify(data), function () {
                                res.send(data);
                            });
                        }
                        if (req.path === '/getLegislators') {
                            addProfiles(data, done);
                        } else {
                            done();
                        }
                    }
                    catch (e) {
                        res.status(403).send();
                    }
                });
            } else {
                console.log(doc);
                res.send(JSON.parse(doc.data));
            }
        });
    })
});

var fs = require('fs');
var phantom = require('phantom');
app.get('/', function(req, res) {
    if(typeof(req.query._escaped_fragment_) !== "undefined") {
        var pathname = __dirname + '/phantom-cache/' + req.query._escaped_fragment_.replace(/\//g,'').slice(1);
        fs.exists(pathname, function (exists) {
            if (exists) {
                res.sendfile(pathname);
            } else {
                phantom.create(function (ph) {
                    ph.createPage(function (page) {
                        page.open("http://localhost:5000#" + req.query._escaped_fragment_, function (status) {
                            page.evaluate(function () { return document.documentElement.innerHTML; }, function (result) {
                                fs.writeFile(pathname, result, function (err) {
                                    res.sendfile(pathname);
                                    ph.exit();
                                });
                            });
                        });
                    });
                });
            }
        });
    } else { 
        res.sendfile(__dirname + '/web/index.html');
    }
});

app.use('/web',express.static(__dirname + '/web'));

var port = Number(process.env.PORT || 5000);
console.log('port', port);
app.listen(port, function() {
  console.log("Listening on " + port);
});