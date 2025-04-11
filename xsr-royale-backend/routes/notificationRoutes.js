const express = require('express');
const router = express.Router();
const { getNotifications, markAsRead } = require('../controllers/notificationController');

router.get('/:userId', getNotifications);         // Get notifications of a user
router.patch('/read/:id', markAsRead);           // Mark notification as read

module.exports = router;
