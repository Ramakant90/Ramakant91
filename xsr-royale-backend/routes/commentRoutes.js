const express = require('express');
const router = express.Router();
const {
  addComment,
  getCommentsByVideo,
  deleteComment
} = require('../controllers/commentController');

// ➕ Add new comment
router.post('/', addComment);

// 📃 Get all comments for a video
router.get('/:videoId', getCommentsByVideo);

// ❌ Delete a comment
router.delete('/:id', deleteComment);

module.exports = router;
