const express = require("express");
const app = express();
const server = require('http').Server(app);

const bodyParser = require("body-parser");
const db = require('./db.js');

const router = require("./network/routes");
db('mongodb://localhost:27017/telegrom');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

app.use('/app', express.static('public'));

server.listen(3000, function () {
  console.log("Listening on http://localhost:3000");
});