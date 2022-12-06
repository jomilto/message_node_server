const { socket } = require("../../socket");
const store = require("./store");

function addMessage(chat, user, message, file) {

    return new Promise(async (resolve, reject) => {
        if (!chat || !user || !message) {
            console.log("[messageController] Incomplete data.")
            return reject("Incomplete data");
        }
        let fileUrl = '';
        if(file) fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        const fullMessage = {
            chat,
            user,
            message,
            file: fileUrl,
            date: new Date()
        };
        const newMessage = await store.add(fullMessage);
        socket.io.emit("message", fullMessage);
        return resolve(newMessage);
    });
}

function getMessages(filterMessage) {
    return new Promise((resolve, reject) => {
        return resolve(store.list(filterMessage));
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