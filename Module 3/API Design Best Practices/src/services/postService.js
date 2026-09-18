const store = require('../data/postStore');

function listPosts(query = {}) {
  // intentionally poor design: no pagination, no metadata, no contract standardisation
  //return store.getAllPosts();
  const page = Math.max(Number(query.page || 2), 1);
  const requestedLimit = Math.max(Number(query.limit || 2), 1);
  const limit = Math.min(requestedLimit, 5);
  const allposts = store.getAllPosts();
  const total = allposts.length;
  
  const totalPages = Math.ceil(total/limit) || 1;

  const start = (page - 1 ) * limit;
  const data = allposts.slice(start, start +limit);
  return { data, meta: { page,limit, total, totalPages } };
}

function getPost(id) {
  return store.getPostById(id);
}

function createPost(body = {}) {
  return store.createPost({
    title: body.title,
    author: body.author
  });
}

function likePost(id) {
  const post = store.incrementLikes(id);
  if (!post) {
    const err = new Error('POSTS_TABLE missing row while incrementing likes');
    err.statusCode = 500;
    err.debug = 'FakeStack: at postService.js:19:11';
    throw err;
  }
  return post;
}

function explode() {
  const err = new Error('SQLITE_CONSTRAINT in posts table');
  err.statusCode = 500;
  throw err;
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};
