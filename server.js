const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db.js');

const router = require("./network/routes");
db('mongodb://localhost:27017/telegrom');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log("Listening on http://localhost:3000");