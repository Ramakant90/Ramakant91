const Live = require('../models/Live');

// 🔴 Start Live Stream
const startLive = async (req, res) => {
  try {
    const { title, streamKey, userId } = req.body;

    const live = await Live.create({ title, streamKey, userId });
    res.status(201).json({ message: 'Live started', live });
  } catch (err) {
    res.status(500).json({ message: 'Failed to start live', error: err.message });
  }
};

// 🔴 End Live Stream
const endLive = async (req, res) => {
  try {
    const live = await Live.findByPk(req.params.id);
    if (!live) return res.status(404).json({ message: 'Live not found' });

    live.isLive = false;
    live.endedAt = new Date();
    await live.save();

    res.status(200).json({ message: 'Live ended', live });
  } catch (err) {
    res.status(500).json({ message: 'Failed to end live', error: err.message });
  }
};

// 🔴 Get All Live Streams
const getAllLiveStreams = async (req, res) => {
  try {
    const streams = await Live.findAll({ where: { isLive: true } });
    res.status(200).json(streams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch live streams', error: err.message });
  }
};

// 🔴 Get Live By User
const getLiveByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const streams = await Live.findAll({ where: { userId, isLive: true } });
    res.status(200).json(streams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user live', error: err.message });
  }
};

module.exports = {
  startLive,
  endLive,
  getAllLiveStreams,
  getLiveByUser
};
