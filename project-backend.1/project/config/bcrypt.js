const bcrypt = require("bcryptjs");

const createHash = (password) => bcrypt.hash(password, 10);

const cmpHash = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  createHash,
  cmpHash,
};
