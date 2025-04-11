const XsrPing = require('../models/xsrPing');

// 🔔 XSR Ping भेजना
const sendXsrPing = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const existing = await XsrPing.findOne({ where: { senderId, receiverId } });
    if (existing) {
      return res.status(400).json({ message: 'Already Pinged' });
    }

    await XsrPing.create({ senderId, receiverId });
    res.status(201).json({ message: '✅ XSR Ping sent successfully' });
  } catch (err) {
    console.error('Ping Error:', err);
    res.status(500).json({ message: '❌ Failed to send XSR Ping' });
  }
};

// 🔕 XSR Ping हटाना
const removeXsrPing = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const deleted = await XsrPing.destroy({ where: { senderId, receiverId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Ping not found' });
    }

    res.status(200).json({ message: '❌ XSR Ping removed' });
  } catch (err) {
    console.error('Remove Ping Error:', err);
    res.status(500).json({ message: 'Failed to remove XSR Ping' });
  }
};

// 🔍 Get All XSR Pings for a User
const getXsrPings = async (req, res) => {
  try {
    const { userId } = req.params;

    const pings = await XsrPing.findAll({ where: { receiverId: userId } });

    res.status(200).json({ message: '✅ Pings fetched', pings });
  } catch (err) {
    console.error('Fetch Ping Error:', err);
    res.status(500).json({ message: 'Failed to fetch XSR Pings' });
  }
};

module.exports = {
  sendXsrPing,
  removeXsrPing,
  getXsrPings
};
