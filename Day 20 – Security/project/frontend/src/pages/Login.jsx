import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const togglePassword = (e) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace this with your actual API call
      // Example response
      const result = {
        success: true,
        token: "dummy-jwt-token", // Replace with real JWT from backend
        user: { email: email },
      };

      if (result.success) {
        // Save token to localStorage
        localStorage.setItem("token", result.token);

        setAlert({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        // Redirect to dashboard after short delay
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setAlert({ type: "error", message: result.message || "Login failed" });
      }
    } catch (error) {
      setAlert({ type: "error", message: "Login failed. Try again." });
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <div className="auth-header">
          <FaLock size={40} color="#4f46e5" style={{ marginBottom: 15 }} />
          <h2>Welcome Back</h2>
          <p>Please sign in to continue</p>
        </div>

        {/* Alert */}
        {alert && (
          <div
            className={`alert ${
              alert.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            {alert.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            {alert.message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email Address
            </label>
            <div className="input-group">
              <span className="input-icon-left">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <div className="input-group">
              <span className="input-icon-left">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-icon-right" onClick={togglePassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <FaSignInAlt /> Sign In
          </button>
        </form>

        <div className="auth-links">
          <p>Don't have an account?</p>
          <a href="/register">
            <FaUserPlus /> Create an account
          </a>
        </div>
      </div>

      <div className="auth-footer">
        <p>© {new Date().getFullYear()} Your App. All rights reserved.</p>
      </div>
    </div>
  );
};