const { users } = require("../models/user.model");

const userResolver = {
  getUsers: () => {
    return users;
  },
  getUserById: (id) => users.find((user) => user.id == id),
};
module.exports = { userResolver };
