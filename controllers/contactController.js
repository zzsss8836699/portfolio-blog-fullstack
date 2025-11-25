const Message = require('../models/Message');

// @desc    Create message
// @route   POST /api/contact
// @access  Public
exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

