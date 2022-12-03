const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.get('/:userId', (req, res) => {
  controller.getChats(req.params.userId)
      .then((data) => {
          response.success(req, res, data, 200);
      })
      .catch(e => {
          response.error(req, res, "Unexpected Error", 500, "Unexpeted Error");
      });
});

router.post('/', (req, res) => {
  const body = req.body;
  controller.addChat(body.users)
      .then((data) => {
          response.success(req, res, data, 201);
      })
      .catch(e => {
          response.error(req, res, "Incomplete information", 500, "Incomplete data");
      });

});

module.exports = router;