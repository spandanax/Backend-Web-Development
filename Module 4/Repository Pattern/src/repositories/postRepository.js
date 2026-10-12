const postStore = require('../data/postStore');

function findAll() {
  return postStore.posts.map((post) => ({ ...post }));
}

function findById(id) {
  const post = postStore.posts.find((post) => post.id === Number(id));
  return post ? { ...post } : null;
}

function create(input) {
  const post = { ...input, id: postStore.nextId() };
  postStore.posts.push(post);
  return { ...post };
}

function update(id, patch) {
  const index = postStore.posts.findIndex((post) => post.id === Number(id));
  if (index === -1) return null;

  postStore.posts[index] = { ...postStore.posts[index], ...patch };
  return { ...postStore.posts[index] };
}

function remove(id) {
  const index = postStore.posts.findIndex((post) => post.id === Number(id));
  if (index === -1) return false;

  const [post] = postStore.posts.splice(index, 1);
  return { ...post };
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};