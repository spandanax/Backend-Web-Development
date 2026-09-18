const store = require('../data/postStore');

function listPosts(query = {}) {
  // Page starts at 1
  const page = Math.max(Number(query.page) || 1, 1);

  // Default limit is 20
  const requestedLimit = Math.max(
    Number(query.limit) || 20,
    1
  );

  // Never allow the client to request more than 100 posts
  const limit = Math.min(requestedLimit, 100);

  const allPosts = store.getAllPosts();

  const total = allPosts.length;

  const pages = Math.max(
    Math.ceil(total / limit),
    1
  );

  const start = (page - 1) * limit;

  const data = allPosts.slice(start, start + limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      pages
    }
  };
}

function getPost(id) {
  const post = store.getPostById(id);

  if (!post) {
    const err = new Error('Post not found');
    err.statusCode = 404;
    err.code = 'NOT_FOUND';
    throw err;
  }

  return post;
}

function createPost(body = {}) {
  const title = body.title;
  const author = body.author;

  if (!title || typeof title !== 'string' || !title.trim()) {
    const err = new Error('Title is required');
    err.statusCode = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  if (!author || typeof author !== 'string' || !author.trim()) {
    const err = new Error('Author is required');
    err.statusCode = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  return store.createPost({
    title: title.trim(),
    author: author.trim()
  });
}

function likePost(id) {
  const post = store.incrementLikes(id);

  if (!post) {
    const err = new Error('Post not found');
    err.statusCode = 404;
    err.code = 'NOT_FOUND';
    throw err;
  }

  return post;
}

function explode() {
  // Deliberate failure for testing the 500 error response
  const err = new Error('Internal server failure');
  err.statusCode = 500;
  err.code = 'INTERNAL_ERROR';

  throw err;
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};