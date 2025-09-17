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
  // update user
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

  deleteUser: (id) => {
    const index = users.findIndex((u) => u.id == id);
    if (index === -1) return false;
    const deleteUser = users[index]; // find delete user
    users.splice(index, 1);
    return true;
  },
};
module.exports = { userResolver };
