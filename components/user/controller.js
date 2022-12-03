const store = require("./store");

function getUsers(filterByUsername) {
  return new Promise((resolve, reject) => {
      return resolve(store.list(filterByUsername));
  });
}

function addUser(name) {
  if(!name) return Promise.reject('Invalid name');
  const user = {
    name
  }
  return store.add(user);
}

module.exports = {
  getUsers,
  addUser,
}