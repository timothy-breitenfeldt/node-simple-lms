var routes = require("express").Router();
var db = require("../dao/db");
var authorDao = require("../dao/authorDao");

routes.get("/author", function(req, res) {
  authorDao.getAllAuthors(function(error, result) {
    if (error) throw error;
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });
});

routes.post("/author", function(req, res) {
  const author = req.body;
  authorDao.addAuthor(author, function(error, result) {
    if (error) {
      res.status(400);
      res.send("Add author failed!");
    }
    res.status(201);
    res.send("Add author successfull!");
  });
});

routes.delete("/author/:id", function(req, res) {
  authorDao.removeAuthor(req.params.id, function(error, result) {
    if (error) {
      res.status(400);
      res.send("Delete author failed!");
    }
    res.status(200);
    res.send("Delete author successfull!");
  });
});

routes.put("/author", function(req, res) {
  const author = req.body;
  authorDao.updateAuthor(author, function(err, result) {
    if (err) {
      res.status(400);
      res.send("Update author failed!");
    }
    res.status(200);
    res.send("Update Successfull!");
  });
});

module.exports = routes;
