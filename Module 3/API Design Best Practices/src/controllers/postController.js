const service = require('../services/postService');
const http = require('../utils/http');

function listPosts(req, res) {
  const rows = service.listPosts(req.query);

  return http.sendList(res, rows.data, rows.meta);
}

function getPost(req, res) {
  const post = service.getPost(req.params.id);

  return http.sendOk(res, post);
}

function createPost(req, res) {
  const post = service.createPost(req.body);

  return http.sendCreated(res, post);
}

function likePost(req, res) {
  const post = service.likePost(req.params.id);

  return http.sendOk(res, {
    id: post.id,
    likes: post.likes
  });
}

function explode(req, res, next) {
  try {
    service.explode();
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};