const bookDao = require("./bookDao");
const authorDao = require("./authorDao");
const dbUtil = require("./dbUtil");

exports.addBookAndAuthor = function(bookAuthor) {
  return new Promise(function(resolve, reject) {
    let finalResult = {};
    authorDao
      .getAuthorByName(bookAuthor.author)
      .then(function(result) {
        if (result.length == 0) {
          authorDao
            .addAuthor({ name: bookAuthor.author })
            .then(function(authorResult) {
              dbUtil.getLastInsertedId().then(function(authorIdObject) {
                const authorId = authorIdObject[0]["LAST_INSERT_ID()"];
                bookDao
                  .addBook({ title: bookAuthor.title, authorId: authorId })
                  .then(function(bookResult) {
                    dbUtil.getLastInsertedId().then(function(bookIdObject) {
                      const bookId = bookIdObject[0]["LAST_INSERT_ID()"];
                      finalResult = resolve({
                        bookId: bookId,
                        authorId: authorId
                      });
                    });
                  })
                  .catch(function(err) {
                    return reject(err);
                  });
              });
            })
            .catch(function(err) {
              return reject(err);
            });
        } else {
          return reject("That author already exists.");
        }
      })
      .catch(function(err) {
        return reject(err);
      });
    return finalResult;
  });
};
