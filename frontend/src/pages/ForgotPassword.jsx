import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "../style/auth.css";

function ForgotPassword() {

    const  navigate= useNavigate();
    
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post("/auth/forgot-password", { email });

            toast.success(response.data.message || "Password reset email sent");

            setEmail("");

        } catch (error) {

            console.log(error);

            toast.error(error.response?.data?.message || "Failed to send reset email");

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
                        Forgot Password?
                    </h1>

                    <p>
                        Enter your email and we'll send you
                        a password reset link.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}
                    </button>

                </form>

                <div className="auth-footer">

                     <span onClick={() => navigate("/login")}>
                        ← Back to Login
                     </span>

                </div>

            </div>

        </div>
    );

}
export default ForgotPassword