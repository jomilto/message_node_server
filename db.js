const db = require("mongoose");

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

async function connect (url) {
  await db.connect(url, options)
  .then(() => console.log('DB connected'))
  .catch((err) => {
      console.log(err);
  });
}

module.exports = connect;
