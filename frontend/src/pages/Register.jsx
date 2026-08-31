import { useState } from "react";
import "../style/auth.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "../utils/validation";


function Register() {

  const navigate = useNavigate();

  // useEffect(() => {

  //       const token = localStorage.getItem("token");

  //       if (token) {
  //           navigate("/dashboard");
  //       }

  //   }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

     //email validation
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }


        //password validation
        if (!passwordRegex.test(formData.password)) {
            toast.error(
                "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
            );
            return;
        }


    try {
      const response = await api.post("/auth/register", formData);

      console.log(response.data);

      toast.success("Registration Successful!");

      navigate("/login");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",

      });

    }
    catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }

  };



  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Left Branding Section */}
        <div className="auth-brand">
          <div className="brand-content">
            {/* <div className="brand-logo">PM</div> */}

            <h1>Project Management System</h1>

            <p>
              Plan projects, manage your team, track tasks,
              and keep your work organized in one place.
            </p>

            <div className="brand-features">
              <div className="brand-feature">
                <span>✓</span>
                <p>Manage projects efficiently</p>
              </div>

              <div className="brand-feature">
                <span>✓</span>
                <p>Collaborate with your team</p>
              </div>

              <div className="brand-feature">
                <span>✓</span>
                <p>Track tasks and progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Register Section */}
        <div className="auth-form-section">
          <div className="auth-card">
            <div className="auth-heading">
              <h2>Create Account</h2>
              <p>
                Create your account to start managing projects.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label htmlFor="name">Full Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label htmlFor="email">Email Address</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label htmlFor="role">
                  Role
                </label>

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="member">
                    Member
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  
                </select>

              </div>

              <button type="submit">
                Create Account
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?{" "}


                <span onClick={() => navigate("/login")}>
                  Login
                </span>



              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;