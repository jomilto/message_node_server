const express = require("express");
const multer = require('multer');

const response = require("../../network/response");
const controller = require("./controller");

const router = express.Router();
const upload = multer({
    dest: 'public/files/',
})

router.get('/', (req, res) => {
    const filterMessage = req.query.chat || null;
    controller.getMessages(filterMessage)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, "Unexpected Error", 500, "Unexpeted Error");
        });
});

router.post('/', upload.single('file'), (req, res) => {
    const body = req.body;
    controller.addMessage(body.chat, body.user, body.message, req.file)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(e => {
            response.error(req, res, "Incomplete information", 400, "Incomplete data");
        });

});

router.patch('/:id', function (req, res) {
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200)
    })
    .catch( e => {
        response.error(req, res, 'Error interno', 500, e);
    });
});

router.delete('/:id', function (req, res) {
    controller.deleteMessage(req.params.id)
    .then(() => {
        response.success(req, res, "Message Deleted", 200)
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    });
})

module.exports = router;