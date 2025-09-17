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

  updateUser: (id, input) => {
    const { firstName, lastName, gender, phone, email } = input;
    const user = users.find((u) => u.id == id);
    if (!user) throw new Error("User not found");
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    return user;
  },
};
module.exports = { userResolver };
