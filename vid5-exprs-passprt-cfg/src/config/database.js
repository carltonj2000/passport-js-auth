const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost:27017/pja";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const connection = mongoose.createConnection(mongoUrl, mongoOptions);

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
});

const User = connection.model("User", UserSchema);

module.exports = { connection, mongoUrl, mongoOptions };
