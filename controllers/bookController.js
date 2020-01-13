const routes = require("express").Router();
const db = require("../dao/db");
const bookDao = require("../dao/bookDao");
const dbUtil = require("../dao/dbUtil");

routes.get("/books", function(req, res) {
  bookDao
    .getAllBooks()
    .then(function(result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200);
      res.send(result);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404);
      res.send(err);
    });
});

routes.post("/books", function(req, res) {
  const book = req.body;
  bookDao
    .addBook(book)
    .then(function(result) {
      res.status(201);
      res.setHeader("Content-Type", "application/json");
      dbUtil.getLastInsertedId().then(function(id) {
        res.send({ bookId: id[0]["LAST_INSERT_ID()"] });
      });
    })
    .catch(function(err) {
      console.log(err);
      res.status(400);
      res.send("Add Book Failed!");
    });
});

routes.delete("/books/:id", function(req, res) {
  bookDao
    .removeBook(req.params.id)
    .then(function(result) {
      res.status(204);
    })
    .catch(function(err) {
      console.log(err);
      res.status(404);
      res.send("Delete Book Failed!");
    });
});

routes.put("/books", function(req, res) {
  const book = req.body;
  bookDao
    .updateBook(book)
    .then(function(result) {
      res.status(200);
      res.send("Update Book Successful!");
    })
    .catch(function(err) {
      console.log(err);
      res.status(404);
      res.send("Update Book Failed!");
    });
});

module.exports = routes;
