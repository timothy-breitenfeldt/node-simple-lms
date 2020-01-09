const db = require("./db");

exports.getLastInsertedId = function() {
  return new Promise(function(resolve, reject) {
    db.query("select LAST_INSERT_ID();", function(err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};
