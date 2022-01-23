function addMessage(user, message) {

    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.log("[messageController] Incomplete data.")
            reject("Incomplete data");
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };

        resolve(fullMessage);
    });
}

module.exports = {
    addMessage,
}