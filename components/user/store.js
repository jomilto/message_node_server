const Model = require("./model");

async function addUser(user) {
    const myUser = new Model(user);
    const newUser = await myUser.save();
    return newUser;
}

async function getUsers(filterByUsername) {
    let filter = {};
    if (filterByUsername) {
        filter = { user: filterByUsername }
    }
    let users = await Model.find(filter);
    return users;
}

async function updateName(id, name) {
    const user = await Model.findById(id);
    user.name = name;
    const newUser = await user.save();
    
    return newUser;
}

function removeUser(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addUser,
    list: getUsers,
    updateText: updateName,
    remove: removeUser,
}