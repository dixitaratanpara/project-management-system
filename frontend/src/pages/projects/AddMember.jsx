import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../style/projects.css";

function AddMember() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();

  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [saving, setSaving] = useState(false);

  //get users
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");

      console.log(response.data);

      setUsers(response.data.users);
    }
    catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message || "Failed to load users");
    }
  }


  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validate User ID
    if (!userId) {
      toast.error("Please select a user");
      return;
    }

    setSaving(true);

    try {
      const response = await api.post(`/projects/${id}/members`,
        {
          userId,
        }
      );

      console.log(response.data);

      toast.success(response.data.message || "Member added successfully");

      navigate(`/projects/${id}/members`);

    }
    catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message || "Failed to add member");

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
                Select a user you want to add to this project.
              </p>

            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="project-form-group">

              <label htmlFor="userId">
                Select User
              </label>

              <select
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value)
                }
                required
              >
                <option value="">
                  Select User
                </option>
                {users.map((user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >
                    {user.name} - {user.email}
                  </option>

                ))}

              </select>

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
              {(user?.role === "admin" || user?.role === "manager") && (
                <button
                  type="submit"
                  className="create-project-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Adding..."
                    : "Add Member"}
                </button>
              )}
            </div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default AddMember;