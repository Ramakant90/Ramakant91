const express = require('express');
const router = express.Router();
const {
  sendXsrPing,
  removeXsrPing,
  getXsrPings
} = require('../controllers/xsrPingController');

router.post('/send', sendXsrPing);           // 🔔 Send XSR Ping
router.delete('/remove', removeXsrPing);     // 🔕 Remove XSR Ping
router.get('/:userId', getXsrPings);         // 🔍 Get All Pings for User

module.exports = router;
