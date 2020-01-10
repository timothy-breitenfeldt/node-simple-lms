const bookDao = require("./bookDao");
const authorDao = require("./authorDao");
const dbUtil = require("./dbUtil");
const db = require("./db");

exports.getAllBooksAndAuthors = function() {
  return new Promise(function(resolve, reject) {
    db.query(
      "select bookId, title, authorId, name as author from book natural join author;",
      function(err, result) {
        console.log(JSON.stringify(result));
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

exports.addBookAndAuthor = function(bookAuthor) {
  return new Promise(function(resolve, reject) {
    let bookId = 0;
    let authorId = 0;
    const getAuthorIdPromise = authorDao.getAuthorByName(bookAuthor.author);

    return (finalResultPromise = getAuthorIdPromise.then(function(authors) {
      if (authors.length == 0) {
        const addAuthorPromise = authorDao.addAuthor({
          name: bookAuthor.author
        });

        const getAuthorIdPromise = addAuthorPromise
          .then(function(authorResult) {
            return dbUtil.getLastInsertedId();
          })
          .catch(function(err) {
            return reject(err);
          });

        const addBookPromise = getAuthorIdPromise
          .then(function(authorIdObject) {
            authorId = authorIdObject[0]["LAST_INSERT_ID()"];
            return bookDao.addBook({
              title: bookAuthor.title,
              authorId: authorId
            });
          })
          .catch(function(err) {
            return reject(err);
          });

        const getBookIdPromise = addBookPromise
          .then(function(bookResult) {
            return dbUtil.getLastInsertedId();
          })
          .catch(function(err) {
            return reject(err);
          });

        const finalPromise = getBookIdPromise
          .then(function(bookIdObject) {
            bookId = bookIdObject[0]["LAST_INSERT_ID()"];
          })
          .catch(function(err) {
            return reject(err);
          });

        Promise.all([
          getAuthorIdPromise,
          addAuthorPromise,
          addBookPromise,
          getBookIdPromise,
          finalPromise
        ]).then(function(result) {
          return resolve({ bookId: bookId, authorId: authorId });
        });
      } else {
        authorId = authors[0].authorId;
        const addBookPromise = bookDao.addBook({
          title: bookAuthor.title,
          authorId: authorId
        });

        const getBookIdPromise = addBookPromise
          .then(function(bookResult) {
            return dbUtil.getLastInsertedId();
          })
          .catch(function(err) {
            return reject(err);
          });

        const finalPromise = getBookIdPromise
          .then(function(bookIdObject) {
            bookId = bookIdObject[0]["LAST_INSERT_ID()"];
          })
          .catch(function(err) {
            return reject(err);
          });

        Promise.all([addBookPromise, getBookIdPromise, finalPromise]).then(
          function(result) {
            return resolve({ bookId: bookId, authorId: authorId });
          }
        );
      }
    }));
  });
};
