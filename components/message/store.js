const Model = require("./model");

async function addMessage(message) {
    const myMessage = new Model(message);
    const newMessage = await myMessage.save();
    return newMessage;
}

function getMessages(filterMessage) {
    return new Promise ((resolve, reject) => {
        let filter = {};
        if (filterMessage) {
            filter = { chat: filterMessage }
        }
        let messages = Model.find(filter)
        .populate('user')
        .exec((error, populated) => {
            if (error) return reject(error);
            return resolve(populated);
        });
    })
}

async function updateText(id, text) {
    const message = await Model.findById(id);
    message.message = text;
    const newMessage = await message.save();
    
    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    remove: removeMessage,
}