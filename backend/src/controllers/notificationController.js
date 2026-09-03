import Notification from "../models/Notification.js";

//get notification
export const getMyNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.userId,
        }).populate("task", "title").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            notifications,
        });

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//mark as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//allmark as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};