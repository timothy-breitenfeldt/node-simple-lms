const db = require("./db");

exports.getAllAuthors = function() {
  return new Promise(function(resolve, reject) {
    db.query("select * from author", function(err, result) {
      return err ? reject(err) : resolve(result);
    });
  });
};

exports.getAuthorByName = function(authorName) {
  return new Promise(function(resolve, reject) {
    db.query(
      "select authorId from author where name = ?;",
      [authorName],
      function(err, result) {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.addAuthor = function(author) {
  return new Promise(function(resolve, reject) {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query("insert into author (name) values(?)", [author.name], function(
        err,
        result
      ) {
        if (err) {
          db.rollback(function(err) {
            return reject(err);
          });
          return reject(err);
        }

        db.commit(function(err, result) {
          return err ? reject(err) : resolve(result);
        });
      });
    });
  });
};

exports.removeAuthor = function(authorId) {
  return new Promise(function(resolve, reject) {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query("delete from author where authorId = ?;", [authorId], function(
        err,
        result
      ) {
        if (err) {
          db.rollback(function(err) {
            return reject(err);
          });
          return reject(err);
        }

        db.commit(function(err, result) {
          return err ? reject(err) : resolve(result);
        });
      });
    });
  });
};

exports.updateAuthor = function(author) {
  return new Promise(function(resolve, reject) {
    db.beginTransaction(function(err) {
      if (err) return reject(err);

      db.query(
        "update author set name=? where authorId = ?;",
        [author.name, author.authorId],
        function(err, result) {
          if (err) {
            db.rollback(function(err) {
              return reject(err);
            });
            return reject(err);
          }

          db.commit(function(err, result) {
            return err ? reject(err) : resolve(result);
          });
        }
      );
    });
  });
};
