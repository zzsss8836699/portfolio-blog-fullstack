const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogController');
const {
  getComments,
  createComment
} = require('../controllers/commentController');
const { protect, authorize } = require('../middleware/auth');

// Blog post routes
router.get('/', getBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', protect, createBlogPost);
router.put('/:id', protect, authorize, updateBlogPost);
router.delete('/:id', protect, authorize, deleteBlogPost);

// Comment routes
router.get('/:postId/comments', getComments);
router.post('/:postId/comments', protect, createComment);

module.exports = router;

