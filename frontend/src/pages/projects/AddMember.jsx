import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/projects.css";

function AddMember() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

// Validate User ID
    if (!userId.trim()) {

      toast.error("User ID is required");

      return;
    }

    setSaving(true);

    try {

      const response = await api.post( `/projects/${id}/members`,
        {
          userId,
        }
      );

      console.log(response.data);

      toast.success(
        response.data.message ||  "Member added successfully"
      );

      navigate(`/projects/${id}/members`);

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add member"
      );

    }
    finally {

      setSaving(false);

    }

  };

  return (
    <div className="projects-page">

      {/* Header */}
      <header className="projects-header">

        <div>

          <p className="projects-label">
            Project
          </p>

          <h1>
            Add Member
          </h1>

          <p className="projects-subtitle">
            Add a user to this project.
          </p>

        </div>

        <button
          type="button"
          className="cancel-project-btn"
          onClick={() =>
            navigate(`/projects/${id}/members`)
          }
        >
          Back to Members
        </button>

      </header>

      {/* Form */}
      <section className="projects-section">

        <div className="project-form-card">

          <div className="section-header">

            <div>

              <h2>
                Add Project Member
              </h2>

              <p>
                Enter the user ID of the member you want to add.
              </p>

            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="project-form-group">

              <label htmlFor="userId">
                User ID
              </label>

              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value)
                }
                required
              />

            </div>

            <div className="project-form-actions">

              <button
                type="button"
                className="cancel-project-btn"
                onClick={() =>
                  navigate(`/projects/${id}/members`)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="create-project-btn"
                disabled={saving}
              >
                {saving
                  ? "Adding..."
                  : "Add Member"}
              </button>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default AddMember;