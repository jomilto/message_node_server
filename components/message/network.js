const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();

router.get('/', (req, res) => {
    response.success(req, res, 'List of Messages');
});

router.post('/', (req, res) => {
    const body = req.body;
    controller.addMessage(body.user, body.message)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, "Incomplete information", 400, "Incomplete data");
        });

});

module.exports = router;