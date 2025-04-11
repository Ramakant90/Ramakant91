const Notification = require('../models/Notification');

// Get all notifications of user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

// Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    await Notification.update({ isRead: true }, { where: { id: notificationId } });
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification', error: err.message });
  }
};
