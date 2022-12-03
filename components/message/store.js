const db = require("mongoose");
const Model = require("./model");

db.Promise = global.Promise;
const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin",
    user: "superroot",
    pass: "superroot123",
    retryWrites: true,
    w: "majority"
};

db.connect("mongodb://localhost:27017/messages", options)
    .then(() => console.log('DB connected'))
    .catch((err) => {
        console.log(err);
    });

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