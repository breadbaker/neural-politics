

module.exports = function(name, callBack) {

     var query = NameRecord.find({'name': name});

      query.exec(function(err, result) {
        if (err) {
            res.send('error');
        } else if (result.length) {
          callBack(result[0]);
        } else {
            callBack(false);
        }
      });
};