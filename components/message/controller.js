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

function getMessages(filterByUsername) {
    return new Promise((resolve, reject) => {
        return resolve(store.list(filterByUsername));
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

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        if (!id) return reject('Invalid Id');
        store.remove(id)
            .then(() => {
                return resolve();
            })
            .catch(e => {
                return reject(e);
            });
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}