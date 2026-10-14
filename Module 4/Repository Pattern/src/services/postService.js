const postRepository = require('../repositories/postRepository');

function getPost(id) {
  return postRepository.findById(id);
}

function listPosts() {
  return postRepository.findAll();
}

function createPost(fields) {
  if (!fields || !fields.title) {
    const error = new Error('Title is required');
    error.statusCode = 422;
    throw error;
  }

  return postRepository.create({
    title: fields.title,
    body: fields.body || '',
    authorId: fields.authorId,
  });
}

function updatePost(id, patch) {
  const post = getPost(id);
  if (!post) return null;

  const safePatch = {};
  if (patch.title !== undefined) safePatch.title = patch.title;
  if (patch.body !== undefined) safePatch.body = patch.body;

  return postRepository.update(id, safePatch);
}

function removePost(id) {
  const removed = postRepository.remove(id);
  return removed !== null && removed !== false;
}

module.exports = { listPosts, getPost, createPost, updatePost, removePost };
