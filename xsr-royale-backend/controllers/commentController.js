// controllers/commentController.js

const Comment = require('../models/Comment');
const Video = require('../models/Video');
const User = require('../models/User');
const XsrPing = require('../models/xsrPing');
const Notification = require('../models/Notification');

// ➕ नया कमेंट जोड़ें + XSR Ping Notifications
const addComment = async (req, res) => {
  try {
    const { text, username, videoId } = req.body;

    const comment = await Comment.create({ text, username, videoId });

    const video = await Video.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const uploader = await User.findByPk(video.userId);
    const commenter = await User.findOne({ where: { username } });

    if (uploader && commenter && uploader.id !== commenter.id) {
      await Notification.create({
        userId: uploader.id,
        type: 'comment',
        fromUserId: commenter.id,
        message: `${commenter.username} ने आपके वीडियो पर कमेंट किया है।`
      });
    }

    const followers = await XsrPing.findAll({
      where: { receiverId: video.userId }
    });

    await Promise.all(followers.map(async (follower) => {
      if (follower.senderId !== commenter.id) {
        await Notification.create({
          userId: follower.senderId,
          type: 'comment',
          fromUserId: commenter.id,
          message: `${commenter.username} ने एक वीडियो पर कमेंट किया है जिसे आपने XSR Ping किया है।`
        });
      }
    }));

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (err) {
    console.error('Add Comment Error:', err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

// 🧾 वीडियो के सभी कमेंट्स लाओ
const getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.findAll({ where: { videoId } });
    res.status(200).json(comments);
  } catch (err) {
    console.error('Get Comments Error:', err);
    res.status(500).json({ message: 'Failed to get comments' });
  }
};

// ❌ कमेंट डिलीट करो
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (err) {
    console.error('Delete Comment Error:', err);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};

module.exports = {
  addComment,
  getCommentsByVideo,
  deleteComment
};
