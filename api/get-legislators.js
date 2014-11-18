var parseString = require('xml2js').parseString;
var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
var xml;

module.exports = function (req, res) {
    client.get("http://www.opensecrets.org/api/?method=getLegislators&id=" + req.body.state + "&apikey=" + process.env.OPEN_KEY, function(data, response){

                xml = data;
                // raw response
                ///console.log(response);
                parseString(xml, function (err, result) {
                    if (err) {
                        res.send({});
                    } else {
                        res.send(result.response);
                    }
                });

            });
}
