var db = require("./db");

exports.getAllBooks = function(cb) {
  db.query("select * from book", function(err, result) {
    cb(err, result);
  });
};

exports.addBook = function(book, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "insert into book (title, authorId) values(?,?)",
      [book.title, book.authorId],
      function(err, res) {
        if (err) {
          console.log(err.message);
          db.rollback(function(err, res) {
            cb(err, res);
          });
        }
        db.commit(function(err, res) {
          cb(err, res);
        });
      }
    );
  });
};

exports.removeBook = function(bookId, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query("delete from book where bookId = ?", [bookId], function(err, res) {
      if (err) {
        db.rollback(function(err, res) {
          cb(err, res);
        });
      }
      db.commit(function(err, res) {
        cb(err, res);
      });
    });
  });
};

exports.updateBook = function(book, cb) {
  db.beginTransaction(function(err) {
    if (err) cb(err, null);

    db.query(
      "update book set title=?, authorId=? where bookId = ?;",
      [book.title, book.authorId, book.bookId],
      function(err, result) {
        if (err) {
          db.rollback(function(err) {
            cb(err, null);
          });
        }
        db.commit(function(err, res) {
          cb(err, res);
        });
      }
    );
  });
};
