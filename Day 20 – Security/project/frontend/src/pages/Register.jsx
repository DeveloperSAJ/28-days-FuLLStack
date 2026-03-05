import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserPlus, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSignInAlt 
} from "react-icons/fa";

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "error", message: "Passwords do not match!" });
      return;
    }

    try {
      // Replace this with your actual API call
      const result = {
        success: true,
        token: "dummy-jwt-token", // Replace with JWT from backend
        user: { username, email },
      };

      if (result.success) {
        // Save token to localStorage for automatic login
        localStorage.setItem("token", result.token);

        setAlert({ type: "success", message: "Registration successful! Redirecting..." });

        // Redirect to dashboard after short delay
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setAlert({ type: "error", message: result.message || "Registration failed" });
      }
    } catch {
      setAlert({ type: "error", message: "Registration failed. Try again." });
    }
  };

  return (
    <div className="container">
      <div className="auth-card">

        <div className="auth-header">
          <FaUserPlus size={40} color="#4f46e5" style={{ marginBottom: 15 }} />
          <h2>Create Account</h2>
          <p>Join us today! It's free and easy</p>
        </div>

        {/* Alert */}
        {alert && (
          <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"}`}>
            {alert.type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />}
            {alert.message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username"><FaUser /> Username</label>
            <div className="input-group">
              <span className="input-icon-left"><FaUser /></span>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                minLength="3"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email"><FaEnvelope /> Email Address</label>
            <div className="input-group">
              <span className="input-icon-left"><FaEnvelope /></span>
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
            <label htmlFor="password"><FaLock /> Password</label>
            <div className="input-group">
              <span className="input-icon-left"><FaLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a password (min. 6 characters)"
                minLength="6"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
            <div className="input-group">
              <span className="input-icon-left"><FaLock /></span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                minLength="6"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="input-icon-right" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <FaUserPlus /> Create Account
          </button>

        </form>

        <div className="auth-links">
          <p>Already have an account?</p>
          <a href="/login"><FaSignInAlt /> Sign in instead</a>
        </div>

      </div>

      <div className="auth-footer">
        <p>© {new Date().getFullYear()} Your App. All rights reserved.</p>
      </div>
    </div>
  );
};