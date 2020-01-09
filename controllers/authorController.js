const routes = require("express").Router();
const db = require("../dao/db");
const authorDao = require("../dao/authorDao");
const dbUtil = require("../dao/dbUtil");

routes.get("/authors", function(req, res) {
  authorDao
    .getAllAuthors()
    .then(function(result) {
      res.setHeader("Content-Type", "application/json");
      res.send(result);
    })
    .catch(function(err) {
      throw err;
    });
});

routes.post("/authors", function(req, res) {
  const author = req.body;
  authorDao
    .addAuthor(author)
    .then(function(result) {
      res.status(201);
      res.setHeader("Content-Type", "application/json");
      dbUtil.getLastInsertedId().then(function(id) {
        res.send({ authorId: id[0]["LAST_INSERT_ID()"] });
      });
    })
    .catch(function(err) {
      res.status(400);
      res.send("Add author failed!");
    });
});

routes.delete("/authors/:id", function(req, res) {
  authorDao
    .removeAuthor(req.params.id)
    .then(function(result) {
      res.status(200);
      res.send("Delete author successfull!");
    })
    .catch(function(err) {
      res.status(400);
      res.send("Delete author failed!");
    });
});

routes.put("/authors", function(req, res) {
  const author = req.body;
  authorDao
    .updateAuthor(author)
    .then(function(result) {
      res.status(200);
      res.send("Update Successfull!");
    })
    .catch(function(err) {
      res.status(400);
      res.send("Update author failed!");
    });
});

module.exports = routes;
