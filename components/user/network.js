const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.get('/', (req, res) => {
  const filterByUsername = req.query.user || null;
  controller.getUsers(filterByUsername)
      .then((data) => {
          response.success(req, res, data, 200);
      })
      .catch(e => {
          response.error(req, res, "Unexpected Error", 500, "Unexpeted Error");
      });
});

router.post('/', (req, res) => {
  const body = req.body;
  controller.addUser(body.name)
      .then((data) => {
          response.success(req, res, data, 201);
      })
      .catch(e => {
          response.error(req, res, "Incomplete information", 400, "Incomplete data");
      });

});

module.exports = router;