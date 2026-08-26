import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/task.css";

function EditTask() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    assignedTo: "",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  //get task 
  const fetchTask = async () => {

    try {

      const response = await api.get(`/tasks/${id}`);

      const task = response.data.task;

      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        assignedTo: task.assignedTo?._id || "",
      });

      // if (task.project?._id) {

      //   const memberResponse = await api.get(
      //     `/projects/${task.project._id}/members`
      //   );

      //   setMembers(memberResponse.data.members);

      // }

    }
    catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message || "Failed to load task");

    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

     if (!formData.title.trim()) {
      toast.error( "Task title is required");
      return;
    }

    setSaving(true);

    try {

      await api.put(`/tasks/${id}`, formData);
 
      toast.success(  response.data.message || "Task updated successfully");

      navigate(`/tasks/${id}`);

    }
    catch (error) {

      console.log(error);

      toast.error( error.response?.data?.message || "Failed to update task");
    }
    finally {

      setSaving(false);

    }
  };

// Loading
  if (loading) {

    return (
      <div className="tasks-page">

        <div className="task-empty-state">

          <p>
            Loading task...
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
            Task
          </p>

          <h1>
            Edit Task
          </h1>

          <p className="tasks-subtitle">
            Update task information.
          </p>

        </div>


        <Link
          to={`/tasks/${id}`}
          className="task-cancel-btn"
        >
          Back to Task
        </Link>

      </header>


      {/* Form */}

      <section className="tasks-section">

        <div className="task-form-card">


          <div className="tasks-section-header">

            <div>

              <h2>
                Edit Task
              </h2>

              <p>
                Update the details of this task.
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>


            {/* Title */}

            <div className="task-form-group">

              <label htmlFor="title">
                Task Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>


            {/* Description */}

            <div className="task-form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Enter task description"
                value={formData.description}
                onChange={handleChange}
              />

            </div>


            {/* Status */}

            <div className="task-form-group">

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="">
                  Select status
                </option>

                <option value="todo">
                  Todo
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>

              </select>

            </div>


            {/* Priority */}

            <div className="task-form-group">

              <label htmlFor="priority">
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >

                <option value="">
                  Select priority
                </option>

                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

              </select>

            </div>


            {/* Assigned User */}

            <div className="task-form-group">

              <label htmlFor="assignedTo">
                Assigned User ID
              </label>

              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Enter user ID"
                value={formData.assignedTo}
                onChange={handleChange}
              />

            </div>


            {/* Actions */}

            <div className="task-form-actions">

              <button
                type="button"
                className="task-cancel-btn"
                onClick={() =>
                  navigate(`/tasks/${id}`)
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="task-create-btn"
                disabled={saving}
              >

                {saving
                  ? "Updating..."
                  : "Update Task"}

              </button>

            </div>


          </form>

        </div>

      </section>

    </div>
  );

}

export default EditTask;