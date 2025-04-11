const express = require('express');
const router = express.Router();
const {
  startLive,
  endLive,
  getAllLiveStreams,
  getLiveByUser
} = require('../controllers/liveController');

// Routes
router.post('/start', startLive);
router.post('/end/:id', endLive);
router.get('/', getAllLiveStreams);
router.get('/user/:userId', getLiveByUser);

module.exports = router;
