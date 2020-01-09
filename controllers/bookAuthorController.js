const routes = require("express").Router();
const bookAuthorDao = require("../dao/bookAuthorDao");

routes.post("/bookauthor", function(req, res) {
  const bookAuthor = req.body;
  bookAuthorDao
    .addBookAndAuthor(bookAuthor)
    .then(function(result) {
      res.status(201);
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
});

module.exports = routes;
