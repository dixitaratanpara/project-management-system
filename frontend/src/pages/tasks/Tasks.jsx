import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/task.css";


function Tasks() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  //get all tasks 
  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const response = await api.get("/tasks");

        console.log(response.data);

        setTasks(response.data.tasks);

      }
      catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message || "Failed to load tasks"
        );

      }
      finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  //Delete task
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/tasks/${id}`);

      toast.success(response.data.message || "Task deleted successfully");

      // Remove deleted task from UI
      setTasks(
        tasks.filter(
          (task) => task._id !== id
        )
      );
    }
    catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  if (loading) {
    return (
      <div className="tasks-page">
        <div className="empty-state">

          <h3>
            Loading tasks...
          </h3>

          <p>
            Please wait while tasks are loading.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">

      {/* Header */}

      <header className="tasks-header">

        <div>

          <p className="tasks-label">
            Management
          </p>

          <p className="tasks-label">
            Tasks
          </p>

          <p className="tasks-subtitle">
            Manage and track your project tasks.
          </p>

        </div>

        <div>
          {(user?.role === "admin" || user?.role === "manager") && (
            <Link
              to="/tasks/create"
              className="task-create-btn"
            >
              + Create Task
            </Link>
          )}
          &nbsp; &nbsp;

          <button
            type="button"
            className="cancel-task-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>

      </header>

      {/* task section */}

      <section className="tasks-section">

        <div className="tasks-section-header">

          <div>

            <h2>
              Task List
            </h2>

            <p>
              View all tasks assigned to your projects.
            </p>

          </div>

        </div>


        {/* No Tasks */}

        {tasks.length === 0 ? (

          <div className="task-feature-empty">

            <div className="task-feature-icon">
              ✓
            </div>

            <h3>
              No tasks Found
            </h3>

            <p>
              Create your first task to start managing project work.
            </p>
            {(user?.role === "admin" || user?.role === "manager") && (
              <Link
                to="/tasks/create"
                className="task-create-btn"
              >
                + Create Task
              </Link>

            )}

          </div>

        ) : (

          /* Task List */

          <div className="tasks-list">

            {tasks.map((task) => (

              <div
                className="task-card"
                key={task._id}
              >

                <div className="task-card-content">

                  <h3>
                    {task.title}
                  </h3>

                  <p>
                    {task.description || "No description available"}
                  </p>

                </div>


                <div className="task-meta">

                  <span>
                    Status: {task.status}
                  </span>

                  <span>
                    Priority: {task.priority}
                  </span>

                  <span>
                    Project:{" "}
                    {task.project?.name || "Unknown"}
                  </span>

                </div>

                {/* //action tag */}
                <div className="task-card-actions">

                  <Link
                    to={`/tasks/${task._id}`}
                    className="task-view-btn"
                  >
                    View
                  </Link>

                  <Link
                    to={`/tasks/edit/${task._id}`}
                    className="task-edit-btn"
                  >
                    Edit
                  </Link>
                  {user?.role === "admin" && (
                    <button
                      type="button"
                      className="task-delete-btn"
                      onClick={() =>
                        handleDelete(task._id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>

              </div>
            ))}



          </div>


        )}
      </section >

    </div >
  );
}

export default Tasks;