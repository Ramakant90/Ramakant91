const Video = require('../models/Video');

// 📥 Get All Videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos', error: err.message });
  }
};

// ❌ Delete Video
const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await video.destroy();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video', error: err.message });
  }
};

// 👁️‍🗨️ Views++
const updateViews = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.views += 1;
    await video.save();

    res.status(200).json({ message: 'View updated', views: video.views });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update views', error: err.message });
  }
};

// 👍 Like++
const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.likes += 1;
    await video.save();

    res.status(200).json({ message: 'Liked', likes: video.likes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to like', error: err.message });
  }
};

// 👎 Dislike++
const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.dislikes += 1;
    await video.save();

    res.status(200).json({ message: 'Disliked', dislikes: video.dislikes });
  } catch (err) {
    res.status(500).json({ message: 'Failed to dislike', error: err.message });
  }
};

// 🔍 Search Videos
const searchVideos = async (req, res) => {
  try {
    const { q } = req.query;

    const videos = await Video.findAll({
      where: {
        title: {
          [Op.iLike]: `%${q}%`
        }
      }
    });

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

// 🗂️ Category-wise
const getVideosByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const videos = await Video.findAll({
      where: { category }
    });

    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to filter by category', error: err.message });
  }
};

module.exports = {
  getAllVideos,
  deleteVideo,
  updateViews,
  likeVideo,
  dislikeVideo,
  searchVideos,
  getVideosByCategory
};
