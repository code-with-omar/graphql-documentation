const { posts } = require("../models/post.model");

const postResolver = {
  getPosts: () => {
    return posts;
  },
  getPostById: (id) => {
    return posts.find((post) => post.id == id);
  },
};
module.exports = { postResolver };
