const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
exports.getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
exports.getBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comments = await Comment.find({ post: post._id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        comments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Protected
exports.createBlogPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and content'
      });
    }

    const post = await BlogPost.create({
      title,
      content,
      author: req.user._id
    });

    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username');

    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Protected & Authorized
exports.updateBlogPost = async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Protected & Authorized
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Also delete all comments associated with this post
    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

