
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/polic';


mongoose.connect(mongoUri);


var DataSchema = new Schema({
    key: String,
    path: String,
    data: String
});

var Record = mongoose.model('GetLegislatorsRecord', DataSchema);


var typeMap = {
    '/getLegislators':'state',
    '/getContributors': 'cid',
    '/getSummary': 'cid',
    '/getIndustries': 'cid',
    '/getProfile': 'cid',
    '/getOrgs': 'org',
    '/orgSummary': 'org'
};
module.exports = {
    search: function (req, callback) {
        Record.findOne({
            key: req.query[typeMap[req.path]],
            path: req.path
        }, callback);
    },
    save: function (req, data, callback) {
        var record = new Record({ data: data });
        record.path = req.path;
        record.key = req.query[typeMap[req.path]];
        record.save(callback);
    }
}