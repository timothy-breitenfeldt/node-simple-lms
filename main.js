const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/

// parse application/json
app.use(bodyParser.json());

app.use(require("./controllers/bookController"));

app.use(require("./controllers/authorController"));

app.use(require("./controllers/bookAuthorController"));

app.listen(3000);
console.log("Server running in port: 3000 ...");
