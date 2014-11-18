var parseString = require('xml2js').parseString;
var Client = require('node-rest-client').Client;

var client = new Client();

// direct way
var xml;

console.log('hello', process.env)

module.exports = function (req, res) {
    client.get("http://www.opensecrets.org/api/?method=candContrib&cid=" + req.body.cid + "&cycle=2014&apikey=" + process.env.OPEN_KEY, function(data, response){

            // console.lo
                // parsed response body as js object
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
