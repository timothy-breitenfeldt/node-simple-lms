var db = require("./db");

exports.getAllAuthors = function(cb) {
  db.query("select * from author", function(err, result) {
    cb(err, result);
  });
};

exports.addAuthor = function(author, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query("insert into author (name) values(?)", [author.name], function(
      err,
      result
    ) {
      if (err) {
        db.rollback(function(err) {
          cb(err, null);
        });
      }

      db.commit(function(err, result) {
        cb(err, result);
      });
    });
  });
};

exports.removeAuthor = function(authorId, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query("delete from author where authorId = ?;", [authorId], function(
      err,
      result
    ) {
      if (err) {
        db.rollback(function(err) {
          cb(err, null);
        });
      }

      db.commit(function(err, result) {
        cb(err, result);
      });
    });
  });
};

exports.updateAuthor = function(author, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "update author set name=? where authorId = ?;",
      [author.name, author.authorId],
      function(err, result) {
        if (err) {
          db.rollback(function(err) {
            cb(err, null);
          });
        }

        db.commit(function(err, result) {
          cb(err, result);
        });
      }
    );
  });
};
