const { users } = require("../models/user.model");

const userResolver = {
  getUsers: () => {
    return users;
  },
  getUserById: (id) => users.find((user) => user.id == id),

  uploadUser: (input) => {
    const { firstName, lastName, gender, phone, email, posts } = input;
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      gender,
      phone,
      email,
      posts: [],
    };

    users.push(newUser);
    return newUser;
  },
};
module.exports = { userResolver };
