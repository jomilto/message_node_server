const store = require("./store");

function addMessage(user, message) {

    return new Promise(async (resolve, reject) => {
        if (!user || !message) {
            console.log("[messageController] Incomplete data.")
            return reject("Incomplete data");
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };
        const newMessage = await store.add(fullMessage);
        return resolve(newMessage);
    });
}

function getMessages() {
    return new Promise((resolve, reject) => {
        return resolve(store.list());
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            return reject('Invalid Data');
        }
        const result = await store.updateText(id, message);
        return resolve(result);
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage
}