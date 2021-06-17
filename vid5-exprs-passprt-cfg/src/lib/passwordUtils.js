const crypto = require("crypto");

const hashIt = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

const validatePassword = (password, hash, salt) =>
  hash === hashIt(password, salt);

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  return { salt, hash: hashIt(password, salt) };
};

module.exports = { validatePassword, genPassword };
