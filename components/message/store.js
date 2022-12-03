const Model = require("./model");

async function addMessage(message) {
    const myMessage = new Model(message);
    const newMessage = await myMessage.save();
    return newMessage;
}

async function getMessages(filterByUsername) {
    let filter = {};
    if (filterByUsername) {
        filter = { user: filterByUsername }
    }
    let messages = await Model.find(filter);
    return messages;
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