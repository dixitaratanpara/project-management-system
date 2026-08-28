import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/task.css";

function CreateTask() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    project: "",
    assignedTo: "",
  });

  const [projects, setProjects] = useState([]);

  const [members, setMembers] = useState([]);

  //loding state
  const [saving, setSaving] = useState(false);


  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const response = await api.get("/projects");

        console.log(response.data);

        setProjects(response.data.projects);

      }
      catch (error) {

        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load projects"
        );

      }

    };

    fetchProjects();

  }, []);

//assign to 
  const handleChange = async (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });


    if (name === "project") {

      setMembers([]);

      setFormData((currentData) => ({
      ...currentData,
      project: value,
      assignedTo: "",
    }));

      if (!value) {
        return;
      }

      try {
        const response = await api.get(`/projects/${value}/members`);

        console.log(response.data);

        setMembers(response.data.members);
      }
      catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message ||"Failed to load project members");
      }
    }
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    if (!formData.project.trim()) {
      toast.error("Project ID is required");
      return;
    }

    setSaving(true);

    try {

      const response = await api.post("/tasks",formData);

      console.log(response.data);

      toast.success(response.data.message ||"Task created successfully");

      navigate("/tasks");

    }
    catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message ||"Failed to create task");

    }
    finally {
      setSaving(false);
    }
  };

  return (
    <div className="tasks-page">

      {/* Header */}
      <header className="tasks-header">

        <div>

          <p className="tasks-label">
            Tasks
          </p>

          <h1>
            Create Task
          </h1>

          <p className="tasks-subtitle">
            Create a new task for your project.
          </p>

        </div>

        <button
          type="button"
          className="cancel-task-btn"
          onClick={() => navigate("/tasks")}
        >
          Back to Tasks
        </button>

      </header>

      {/* Form */}
      <section className="tasks-section">

        <div className="task-form-card">

          <form onSubmit={handleSubmit}>

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
                rows="5"
                required
              />

            </div>
            <div className="task-form-group">

              <label htmlFor="project">
                Project
              </label>

              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Project
                </option>

                {/* Projects will be loaded here */}

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                ))}


              </select>

            </div>

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
                <option value="todo">
                  To Do
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>

              </select>

            </div>

            <div className="task-form-group">

              <label htmlFor="assignedTo">
                Assigned To
              </label>

              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
              >
                <option value="">
                  Unassigned
                </option>

                {members.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name} - {member.email}
                  </option>
                ))}
              </select>

            </div>

            <div className="task-form-actions">

              <button
                type="button"
                className="cancel-task-btn"
                onClick={() => navigate("/tasks")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="create-task-btn"
                disabled={saving}
              >
                {saving
                  ? "Creating..."
                  : "Create Task"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default CreateTask;