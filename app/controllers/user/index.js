const createUser = require("./createUser");
const getUserById = require("./getUserById");
const getUserIp = require("./getUserIp");
const userLastLogin = require("./userLastLogin");
const userLogin = require("./userLogin");

module.exports = {
  createUser,
  getUserById,
  userLogin,
  userLastLogin,
  getUserIp,
};
