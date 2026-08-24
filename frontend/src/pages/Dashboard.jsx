import { Link, useNavigate } from "react-router-dom";
import "../style/dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

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

            <h1>Welcome back!,{user?.name || "User"}!</h1>

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
                {user?.role || "Member"}
              </span>
            </div>

          </div>

        </header>

        {/* Statistics */}
        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon">
              P
            </div>

            <div>
              <p>Total Projects</p>

              <h2>
                {projectCount}
              </h2>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              T
            </div>

            <div>
              <p>Active Tasks</p>
              <h2>0</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>
              <p>Completed Tasks</p>
              <h2>0</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              !
            </div>

            <div>
              <p>Notifications</p>
              <h2>0</h2>
            </div>

          </div>

        </section>

        {/* Recent Activity */}
        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <h2>Recent Activity</h2>

              <p>
                Keep track of the latest updates.
              </p>

            </div>

          </div>

          <div className="empty-state">

            <div className="empty-icon">
              ✓
            </div>

            <h3>No recent activity</h3>

            <p>
              Your latest project and task activity
              will appear here.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;