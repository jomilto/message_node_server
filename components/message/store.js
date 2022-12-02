const db = require("mongoose");
const Model = require("./model");

db.Promise = global.Promise;
const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

db.connect("mongodb+srv:///messages?retryWrites=true&w=majority", options)
    .then(() => console.log('DB connected'))
    .catch((err) => {
        console.log(err);
    });

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages() {
    let messages = await Model.find();
    return messages;
}

async function updateText(id, text) {
    const message = await Model.findById(id);
    message.message = text;
    const newMessage = await message.save();
    
    return newMessage;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText
}