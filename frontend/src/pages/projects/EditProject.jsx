import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/projects.css";

function EditProject() {

  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);

        const project = response.data.project;

        setFormData({
          name: project.name,
          description: project.description,
          status: project.status,
        });
      }
      catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load project"
        );
      }
      finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await api.put(
        `/projects/${id}`,
        formData
      );

      console.log(response.data);

      toast.success(
        response.data.message ||
        "Project updated successfully!"
      );

      navigate(`/projects/${id}`);
    }
    catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update project"
      );
    }
    finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="projects-page">

        <div className="empty-state">

          <h3>
            Loading project...
          </h3>

        </div>

      </div>
    );
  }

  return (
    <div className="projects-page">

      {/* Header */}
      <header className="projects-header">

        <div>

          <p className="projects-label">
            Workspace
          </p>

          <h1>Edit Project</h1>

          <p className="projects-subtitle">
            Update your project information.
          </p>

        </div>

        <button
          type="button"
          className="cancel-project-btn"
          onClick={() => navigate(`/projects/${id}`)}
        >
          Back to Project
        </button>

      </header>

      {/* Form Section */}
      <section className="projects-section">

        <div className="project-form-card">

          <div className="section-header">

            <div>

              <h2>Project Information</h2>

              <p>
                Update the details of your project.
              </p>

            </div>

          </div>
          <br></br>
          <form onSubmit={handleSubmit}>

            {/* Project Name */}
            <div className="project-form-group">

              <label htmlFor="name">
                Project Name :
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

            {/* Description */}
            <div className="project-form-group">

              <label htmlFor="description">
                Description :
              </label>

              <textarea
                id="description"
                name="description"
                placeholder="Describe your project"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              />

            </div>

            {/* Status */}
            <div className="project-form-group">

              <label htmlFor="status">
                Status :
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="planning">
                  Planning
                </option>

                <option value="active">
                  Active
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>

            </div>

            {/* Actions */}
            <div className="project-form-actions">

              <button
                type="button"
                className="cancel-project-btn"
                onClick={() => navigate(`/projects/${id}`)}
              >
                Cancel
              </button>
              {(user?.role === "admin" || user?.role === "manager") && (
                <button
                  type="submit"
                  className="create-project-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Updating..."
                    : "Update Project"}
                </button>
              )}
            </div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default EditProject;