const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    Get all comments for a post
// @route   GET /api/blog/:postId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create comment
// @route   POST /api/blog/:postId/comments
// @access  Protected
exports.createComment = async (req, res, next) => {
  try {
    const { body } = req.body;
    const { postId } = req.params;

    if (!body) {
      return res.status(400).json({
        success: false,
        message: 'Please provide comment body'
      });
    }

    // Check if post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: postId
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    next(error);
  }
};

