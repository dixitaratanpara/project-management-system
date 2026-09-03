import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/task.css";
import Comments from "../Comments/Comments";
import Tasks from "./Tasks";

function TaskDetails() {

  const { id } = useParams();

  const [task, setTask] = useState(null);

  const [loading, setLoading] = useState(true);

  //get all task
  useEffect(() => {

    const fetchTask = async () => {

      try {

        const response = await api.get(`/tasks/${id}`);

        console.log(response.data);

        setTask(response.data.task);

      }
      catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message || "Failed to load task"
        );

      }
      finally {
        setLoading(false);
      }

    };

    fetchTask();

  }, [id]);


  if (loading) {
    return (
      <div className="task-details-page">
        <div className="empty-state">

          <h3>
            Loading task...
          </h3>

        </div>
      </div>
    );
  }

  //not found task
  if (!task) {
    return (
      <div className="task-details-page">
        <div className="empty-state">

          <h3>
            Task not found
          </h3>

          <Link to="/tasks">
            Back to Tasks
          </Link>

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
            Task Details
          </p>

          <h1>
            {task.title}
          </h1>

          <p className="tasks-subtitle">
            View task information and details.
          </p>

        </div>


        <div className="task-header-actions">

          <Link
            to="/tasks"
            className="task-cancel-btn"
          >
            Back to Tasks
          </Link>


          <Link to={`/tasks/edit/${task._id}`}
            className="task-edit-btn" >
            Edit Task
          </Link>

        </div>

      </header>


      {/* Task Information */}

      <section className="tasks-section">

        <div className="task-form-card">


          <div className="tasks-section-header">

            <div>

              <h2>
                Task Information
              </h2>

              <p>
                Details about this task.
              </p>

            </div>

          </div>


          <div className="task-details">


            {/* Title */}

            <div className="task-detail-item">

              <span>
                Task Title
              </span>

              <strong>
                {task.title}
              </strong>

            </div>


            {/* Description */}

            <div className="task-detail-item">

              <span>
                Description
              </span>

              <p>
                {task.description || "No description available."}
              </p>

            </div>


            {/* Status */}

            <div className="task-detail-item">

              <span>
                Status
              </span>

              <strong>
                {task.status || "Not available"}
              </strong>

            </div>


            {/* Priority */}

            <div className="task-detail-item">

              <span>
                Priority
              </span>

              <strong>
                {task.priority || "Not available"}
              </strong>

            </div>


            {/* Project */}

            <div className="task-detail-item">

              <span>
                Project
              </span>

              <strong>
                {task.project?.name || "Not available"}
              </strong>

            </div>


            {/* Assigned User */}

            <div className="task-detail-item">

              <span>
                Assigned To
              </span>

              <strong>
                {task.assignedTo?.name ||"Not assigned"}
              </strong>

            </div>


            {/* Assigned User Email */}

            <div className="task-detail-item">

              <span>
                Assigned User Email
              </span>

              <strong>
                {task.assignedTo?.email || "Not available"}
              </strong>

            </div>


            {/* Created By */}

            <div className="task-detail-item">

              <span>
                Created By
              </span>

              <strong>
                {task.createdBy?.name || "Unknown"}
              </strong>

            </div>


            {/* Creator Email */}

            <div className="task-detail-item">

              <span>
                Creator Email
              </span>

              <strong>
                {task.createdBy?.email || "Not available"}
              </strong>

            </div>


          </div>

        </div>

      </section>
      <Comments taskId={task._id} />

    </div>
  );
}

export default TaskDetails;