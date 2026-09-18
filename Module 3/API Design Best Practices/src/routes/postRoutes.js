const express = require('express');
const controller = require('../controllers/postController');

const router = express.Router();

// Get all posts
router.get('/posts', controller.listPosts);

// Get one post
router.get('/posts/:id', controller.getPost);

// Create a post
router.post('/posts', controller.createPost);

// Like a post
router.post('/posts/:id/likes', controller.likePost);

// Demo internal error route
router.get('/demo/internal-error', controller.explode);

module.exports = router;