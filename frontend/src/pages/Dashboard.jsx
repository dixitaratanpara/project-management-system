import { Link, useNavigate } from "react-router-dom";
import "../style/dashboard.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  //fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const projectsResponse = await api.get("/projects");
      const tasksResponse = await api.get("/tasks");
      const notificationsResponse = await api.get("/notifications");

      console.log("Projects:", projectsResponse.data);

      console.log("Tasks:", tasksResponse.data);

      console.log("Notifications:", notificationsResponse.data);


      //projects
      setProjects(projectsResponse.data.projects || []);


      // Tasks
      setTasks(tasksResponse.data.tasks || []);

      // Notifications
      setNotifications(notificationsResponse.data.notifications || []);
    }
    catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to load dashboard data");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // total Projects
  const totalProjects = projects.length;


  // active Tasks
  const activeTasks = tasks.filter((task) =>
    task.status === "todo" ||
    task.status === "in-progress"
  ).length;

  // Completed Tasks
  const completedTasks = tasks.filter((task) =>
    task.status === "completed"
  ).length;

  // Notifications
 // const notificationCount = notifications.length; // all notification mate
  const notificationCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Recent Activity
  const recentActivity = [...projects.map((project) => ({
    type: "project",
    title: project.name,
    date: project.createdAt
  })),

  ...tasks.map((task) => ({
    type: "task",
    title: task.title,
    date: task.createdAt
  }))

  ]
    .filter((item) => item.date)
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);



  return (
    <div className="dashboard-layout">

      {/* Sidebar */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            PM
          </div>

          <div>
            <h2>ProjectHub</h2>
            <span>Management System</span>
          </div>

        </div>


        {/* Navigation */}

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className="active"
          >
            <span>▦</span>
            Dashboard
          </Link>

          <Link to="/projects">
            <span>▣</span>
            Projects
          </Link>

          <Link to="/tasks">
            <span>✓</span>
            Tasks
          </Link>

          <Link to="/notifications">
            <span>🔔</span>
            Notifications
          </Link>

        </nav>


        {/* Logout */}

        <div className="sidebar-bottom">

          <button onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}

      <main className="dashboard-main">


        {/* Header */}

        <header className="dashboard-header">

          <div>

            <p className="dashboard-label">
              Overview
            </p>

            <h1>
              Welcome back, {user?.name || "User"}!
            </h1>

            <p className="dashboard-subtitle">
              Here's what's happening with your projects today.
            </p>

          </div>


          <div className="dashboard-user">

            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>

              <strong>
                {user?.name || "User"}
              </strong>

              <span>
                {user?.role || "member"}
              </span>

            </div>

          </div>

        </header>


        {/* Statistics */}

        <section className="dashboard-stats">


          {/* Projects */}

          <div className="stat-card">

            <div className="stat-icon">
              P
            </div>

            <div>

              <p>Total Projects</p>

              <h2>
                {loading
                  ? "..."
                  : totalProjects}
              </h2>

            </div>

          </div>


          {/* Active Tasks */}

          <div className="stat-card">

            <div className="stat-icon">
              T
            </div>

            <div>

              <p>Active Tasks</p>

              <h2>
                {loading
                  ? "..."
                  : activeTasks}
              </h2>

            </div>

          </div>


          {/* Completed Tasks */}

          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>

              <p>Completed Tasks</p>

              <h2>
                {loading
                  ? "..."
                  : completedTasks}
              </h2>

            </div>

          </div>


          {/* Notifications */}

          <div className="stat-card">

            <div className="stat-icon">
              !
            </div>

            <div>

              <p>Notifications</p>

              <h2>
                {loading
                  ? "..."
                  : notificationCount}

              </h2>

            </div>

          </div>

        </section>


        {/* Recent Activity */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <h2>
                Recent Activity
              </h2>

              <p>
                Keep track of the latest updates.
              </p>

            </div>

          </div>
          {/* loding */}
          {loading && (
            <div className="empty-state" >
              <div className="empty-icon">
                ✓
              </div>
              <h3>
                Loading activity...
              </h3>
              <p>
                Please wait while we load your latest activity.
              </p>

            </div>
          )}
          {/* No Activity */}
          {!loading &&
            recentActivity.length === 0 && (

              <div className="empty-state">

                <div className="empty-icon">
                  ✓
                </div>

                <h3>
                  No recent activity
                </h3>

                <p>
                  Your latest project and task activity will appear here.
                </p>

              </div>
            )}

          {/* Activity List */}
          {!loading &&
            recentActivity.length > 0 && (
              <div className="activity-list">
                {recentActivity.map(
                  (activity, index) => (

                    <div
                      className="activity-item"
                      key={`${activity.type}-${index}`}
                    >
                      <div className="activity-icon">

                        {activity.type === "project"
                          ? "P"
                          : "T"}

                      </div>
                      <div className="activity-content">

                        <strong>

                          {activity.type === "project"
                            ? "Project created"
                            : "Task created"}

                        </strong>

                        <p>
                          {activity.title}
                        </p>

                      </div>


                      <span className="activity-date">

                        {new Date(
                          activity.date
                        ).toLocaleDateString()}

                      </span>

                    </div>

                  )
                )}

              </div>

            )}
        </section>


      </main>

    </div>
  );
}

export default Dashboard;