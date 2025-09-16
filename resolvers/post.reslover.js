const { posts } = require("../models/post.model");

const postResolver = {
  getPosts: () => {
    return posts;
  },
  getPostById: (id) => {
    return posts.find((post) => post.id == id);
  },
  getPostByUserId: (parent) => {
    // parent.posts contains array of post IDs
    return posts.filter((post) => parent.posts.includes(post.id));// find user post by user id
  },
};
module.exports = { postResolver };
