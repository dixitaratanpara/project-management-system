import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../style/auth.css";
import { passwordRegex } from "../utils/validation";

function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();



    if (!password || !confirmPassword) {
      toast.error("Please enter both passwords");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
      );
      return;
    }

    setLoading(true);

    try {

      const response = await api.put(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(
        response.data.message ||
        "Password reset successfully"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to reset password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <p className="auth-label">
            Account Recovery
          </p>

          <h1>
            Reset Password
          </h1>

          <p>
            Enter your new password below.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* New Password */}

          <div className="form-group">

            <label htmlFor="password">
              New Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {/* Confirm Password */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

        <div className="auth-footer">

          <Link to="/login">
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;