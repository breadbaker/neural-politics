var _ = require('lodash');

var states = require('./src/scripts/data/states');
var statesKeys = Object.keys(states);

var twitterConfig = {
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    consumer_key: process.env.TWITTER_CONSUMER_KEY
};
var Twitter = require('twitter');

var client = new Twitter(twitterConfig);

var finish = _.after(statesKeys.length, process.exit);

    _.each(statesKeys, function (key) {
        var data;
        db.Record.findOne({
            path: '/getLegislators',
            key: key
        }, function (err, record) {

            if (record) {
                data = JSON.parse(record.data);
                var done = _.after(data.legislator.length, function () {
                    record.data = JSON.stringify(data);
                    record.save(finish);
                });

                _.each(data.legislator, function (item) {
                    if (!item.$.profileImage) {
                        client.get('users/show', { screen_name: legislator.$.twitter_id }, function (error, profile, response) {
                            if (error) {
                                legislator.$.profileImage
                            } else {
                                legislator.$.profileImage = profile['profile_image_url'].replace('_normal', '_400x400');
                            }
                            done();
                        });
                    } else {
                        done();
                    }
                });
                
            }
        });
    })
});
// var stateReplacement = {
//     'AK': {
//         'N00007999': '/web/images/profile.png'
//     }
// }
// require('./secret')();

// db = require('./db');

// var done = _.after(Object.keys(stateReplacement).length, process.exit);
// _.each(stateReplacement, function (replacements, key) {
//     var data;
//     db.Record.findOne({
//         path: '/getLegislators',
//         key: key
//     }, function (err, record) {
//         if (record) {
//             data = JSON.parse(record.data);
//             _.each(replacements, function (newSrc, cid) {
//                 _.each(data.legislator, function (item) {
//                     // if (item.$.cid === cid) {
//                         item.$.profileImage = newSrc;
//                     // }
//                 });
//             });
//             record.data = JSON.stringify(data);
//             record.save(done);
//         }
//     })
// });
