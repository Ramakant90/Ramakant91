const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const Video = require('../models/Video');
const Notification = require('../models/Notification');
const XsrPing = require('../models/xsrPing');
const User = require('../models/User');

// 📤 Upload Media with XSR Ping Notification
const uploadMedia = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded. Please send via "file" field.' });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'auto',
      folder: 'XSR_Royale'
    });

    fs.unlinkSync(file.path);

    const newVideo = await Video.create({
      title: req.body.title || file.originalname,
      url: result.secure_url,
      userId: req.user?.id || null
    });

    const uploaderId = req.user?.id;

    if (uploaderId) {
      const uploader = await User.findByPk(uploaderId);
      const followers = await XsrPing.findAll({ where: { receiverId: uploaderId } });

      await Promise.all(
        followers.map(async (follower) => {
          await Notification.create({
            userId: follower.senderId,
            type: 'video',
            fromUserId: uploaderId,
            message: `${uploader.username} ने एक नया वीडियो पोस्ट किया है।`
          });
        })
      );
    }

    res.status(200).json({
      message: 'Video uploaded and saved successfully',
      video: newVideo
    });

  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

module.exports = {
  uploadMedia
};
