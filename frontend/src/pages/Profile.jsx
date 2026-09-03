import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../style/profile.css";

function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {

    try {

      const response = await api.get("/auth/profile");

      console.log("Profile:", response.data);

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      toast.error(error.response?.data?.message ||"Failed to load profile");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">

        <div className="profile-card">

          <h3>
            Loading profile...
          </h3>

        </div>

      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div>

          <p className="profile-label">
            Account
          </p>

          <h1>
            My Profile
          </h1>

          <p className="profile-subtitle">
            View your account information.
          </p>

        </div>

        <Link
          to="/dashboard"
          className="profile-back-btn"
        >
          ← Dashboard
        </Link>

      </div>


      <section className="profile-card">

        <div className="profile-avatar">

          {user?.name
            ?.charAt(0)
            .toUpperCase() || "U"}

        </div>


        <div className="profile-info">

          <div className="profile-field">

            <span>
              Name
            </span>

            <strong>
              {user?.name || "N/A"}
            </strong>

          </div>


          <div className="profile-field">

            <span>
              Email
            </span>

            <strong>
              {user?.email || "N/A"}
            </strong>

          </div>


          <div className="profile-field">

            <span>
              Role
            </span>

            <strong className="profile-role">
              {user?.role || "Member"}
            </strong>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;