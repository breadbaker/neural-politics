var _ = require('lodash');
var stateReplacement = {
    'AK': {
        'N00007999': '/web/images/dan.jpg'
    }
}
require('./secret')();

db = require('./db');

var done = _.after(Object.keys(stateReplacement).length, process.exit);
_.each(stateReplacement, function (replacements, key) {
    var data;
    db.Record.findOne({
        path: '/getLegislators',
        key: key
    }, function (err, record) {
        if (record) {
            data = JSON.parse(record.data);
            _.each(replacements, function (newSrc, cid) {
                _.each(data.legislator, function (item) {
                    if (item.$.cid === cid) {
                        item.$.profileImage = newSrc;
                    }
                });
            });
            record.data = JSON.stringify(data);
            record.save(done);
        }
    })
});
