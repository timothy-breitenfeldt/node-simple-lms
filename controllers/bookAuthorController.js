const routes = require("express").Router();
const bookAuthorDao = require("../dao/bookAuthorDao");

routes.get("/bookauthors", function(req, res) {
  bookAuthorDao
    .getAllBooksAndAuthors()
    .then(function(result) {
      res.status(200);
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404);
      res.send("Unable to get books and authors");
    });
});

routes.post("/bookauthors", function(req, res) {
  const bookAuthor = req.body;
  bookAuthorDao
    .addBookAndAuthor(bookAuthor)
    .then(function(result) {
      res.status(201);
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      console.log(err);
      res.status(400);
      res.send("unable to post book and author.");
    });
});

routes.put("/bookauthors", function(req, res) {
  const bookAuthor = req.body;
  bookAuthorDao
    .updateBookAndAuthor(bookAuthor)
    .then(function(result) {
      res.status(204);
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404);
      res.send("unable to put book and author.");
    });
});

module.exports = routes;
