var parseString = require('xml2js').parseString;
var Client = require('node-rest-client').Client;
var client = new Client();
var xml;

module.exports = function (url, callback) {
    client.get( url + "&apikey=" + process.env.OPEN_KEY, function(data, response){
        xml = data;
        parseString(xml, function (err, result) {
            if (err) {
                callback({});
            } else {
                callback(result.response);
            }
        });

    });
}
