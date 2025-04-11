const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ✅ Upload Controller
const { uploadMedia } = require('../controllers/uploadController');

// ✅ Video Controller
const {
  getAllVideos,
  deleteVideo,
  updateViews,
  likeVideo,
  dislikeVideo,
  getVideosByCategory, // ✅ optional
  searchVideos
} = require('../controllers/videoController');

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('file'), uploadMedia);         // ⬅ Upload
router.get('/', getAllVideos);                               // ⬅ All videos
router.delete('/:id', deleteVideo);                          // ⬅ Delete video

router.patch('/views/:id', updateViews);                     // ⬅ Views++
router.patch('/like/:id', likeVideo);                        // ⬅ Like++
router.patch('/dislike/:id', dislikeVideo);                  // ⬅ Dislike++

router.get('/search/videos', searchVideos);                  // ⬅ Search
// router.get('/category/:category', getVideosByCategory);    // ⬅ Category-wise videos

module.exports = router;
