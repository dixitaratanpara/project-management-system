import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/notifications.css";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {

    try {

      const response = await api.get("/notifications");

      console.log(response.data);

      setNotifications(response.data.notifications);

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load notifications"
      );

    }
    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchNotifications();

  }, []);

  const markAsRead = async (id) => {

    try {

      await api.put(`/notifications/${id}/read`);

      toast.success("Notification marked as read");

      fetchNotifications();

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to mark notification as read"
      );

    }

  };

  const markAllAsRead = async () => {

    try {

      await api.put("/notifications/read-all");

      toast.success("All notifications marked as read");

      fetchNotifications();

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to mark notifications as read"
      );

    }

  };

  if (loading) {

    return (
      <div className="notifications-page">

        <div className="empty-state">

          <h3>
            Loading notifications...
          </h3>

        </div>

      </div>
    );

  }

  return (
    <div className="notifications-page">

      <header className="notifications-header">

        <div>

          <p className="notifications-label">
            Notifications
          </p>

          <h1>
            Your Notifications
          </h1>

          <p className="notifications-subtitle">
            Stay updated with your project activity.
          </p>

        </div>

        {notifications.length > 0 && (

          <button
            onClick={markAllAsRead}
            className="mark-all-btn"
          >
            Mark All as Read
          </button>

        )}

      </header>

      <section className="notifications-section">

        {notifications.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🔔
            </div>

            <h3>
              No notifications
            </h3>

            <p>
              You're all caught up.
            </p>

          </div>

        ) : (

          <div className="notifications-list">

            {notifications.map((notification) => (

              <div
                key={notification._id}
                className={`notification-card ${
                  notification.isRead
                    ? "read"
                    : "unread"
                }`}
              >

                <div className="notification-icon">
                  🔔
                </div>

                <div className="notification-content">

                  <p>
                    {notification.message}
                  </p>

                  <span>
                    {notification.createdAt
                      ? new Date(
                          notification.createdAt
                        ).toLocaleString()
                      : ""}
                  </span>

                </div>

                {!notification.isRead && (

                  <button
                    onClick={() =>
                      markAsRead(notification._id)
                    }
                  >
                    Mark as Read
                  </button>

                )}

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );

}

export default Notifications;