import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../../style/projects.css";

function CreateProject() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
  });

  const [loading, setLoading] = useState(false);

  //input handling
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/projects", formData);

      // console.log(response.data);

      toast.success("Project created successfully!");

      navigate("/dashboard");


    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to create project"
      );
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="project-form-page">

      <div className="project-form-header">

        <div>
          <p className="projects-label">
            Projects
          </p>

          <h1>Create Project</h1>

          <p className="projects-subtitle">
            Create a new project and start working with your team.
          </p>
        </div>

        <Link
          to="/projects"
          className="back-project-btn"
        >
          ← Back to Projects
        </Link>

      </div>


      <section className="project-form-section">

        <div className="project-form-card">

          <div className="project-form-title">

            <h2>Project Information</h2>

            <p>
              Enter the basic information for your project.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="name">
                Project Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Enter project description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>

            </div>


            <div className="project-form-actions">

              <Link
                to="/projects"
                className="cancel-project-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="save-project-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Project"}
              </button>
            </div>

          </form>

        </div>

      </section>

    </div>
  );



}

export default CreateProject;