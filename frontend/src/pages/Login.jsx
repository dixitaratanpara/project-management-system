import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "../style/auth.css";
import { Link } from "react-router-dom";



function Login() {

    const navigate = useNavigate();

    //     useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //       navigate("/dashboard");
    //     }
    //   }, [navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/login", formData);

            console.log(response.data);

            //get tokrn
            const token = response.data.token;

            //save token
            localStorage.setItem("token", response.data.token);

            //save user
            localStorage.setItem("user", JSON.stringify(response.data.user));

            toast.success("Login Successful!");

            setFormData({
                email: "",
                password: "",
            });

            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }

    };

    return (
        <div className="auth-page">
            <div className="auth-container">

                {/* //Left  Section  */}
                <div className="auth-brand">
                    <div className="brand-content">
                        <h1>Welcome Back</h1>

                        <p>
                            Sign in to manage your projects, collaborate
                            with your team, and keep your work moving forward.
                        </p>

                        <div className="brand-features">
                            <div className="brand-feature">
                                <span>✓</span>
                                <p>Stay on top of your projects</p>
                            </div>

                            <div className="brand-feature">
                                <span>✓</span>
                                <p>Manage tasks and deadlines</p>
                            </div>

                            <div className="brand-feature">
                                <span>✓</span>
                                <p>Work better with your team</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Right Login Section  */}
                <div className="auth-form-section">
                    <div className="auth-card">

                        <div className="auth-heading">
                            <h2>Login</h2>

                            <p>
                                Enter your account details to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
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
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit">
                                Login
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?

                                <span onClick={() => navigate("/register")}>
                                    Register
                                </span>

                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );

}
export default Login;