import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaShieldAlt, FaHome, FaUser, FaCog, FaSignOutAlt, 
  FaUsers, FaStar, FaClock, FaEnvelope, FaUserTag, FaCalendar 
} from "react-icons/fa";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Mock API response (replace with real API)
        const result = {
          success: true,
          user: {
            username: "JohnDoe",
            email: "john@example.com",
            role: "user",
            created_at: new Date()
          }
        };

        if (result.success) {
          setUser(result.user);
        } else {
          setAlert({ type: "error", message: result.message });
        }
      } catch (error) {
        setAlert({ type: "error", message: "Failed to load profile" });
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="dashboard-container container"
      style={{
        background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
        minHeight: "100vh"
      }}
    >
      {/* NAVBAR */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <FaShieldAlt size={24} />
          <span>AuthSystem</span>
        </div>

        <div className="nav-links">
          <a href="#" className="nav-link active">
            <FaHome /> Dashboard
          </a>
          <a href="#" className="nav-link">
            <FaUser /> Profile
          </a>
          <a href="#" className="nav-link">
            <FaCog /> Settings
          </a>
        </div>

        <button className="btn-logout" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* ALERT */}
      {alert && (
        <div
          className={`alert ${
            alert.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          <i
            className={`fas ${
              alert.type === "success"
                ? "fa-check-circle"
                : "fa-exclamation-circle"
            }`}
          ></i>
          {alert.message}
        </div>
      )}

      {/* CONTENT */}
      <div className="dashboard-content">
        {/* Welcome Card */}
        <div className="welcome-card">
          {loading ? (
            <>
              <h1>Loading your dashboard...</h1>
              <div className="spinner"></div>
            </>
          ) : (
            <>
              <h1>Welcome back, {user?.username}!</h1>
              <p>We're glad to see you again. Here's what's happening with your account today.</p>

              <div style={{ marginTop: "20px", padding: "15px", background: "#f3f4f6", borderRadius: "10px" }}>
                <p>
                  <FaEnvelope style={{ color: "#4f46e5", marginRight: 6 }} />
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <FaUserTag style={{ color: "#4f46e5", marginRight: 6 }} />
                  <strong>Role:</strong> {user?.role}
                </p>
                <p>
                  <FaCalendar style={{ color: "#4f46e5", marginRight: 6 }} />
                  <strong>Member since:</strong> {new Date(user?.created_at).toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3>Profile Views</h3>
              <p>1,234</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-info">
              <h3>Projects</h3>
              <p>12</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>Hours Saved</h3>
              <p>168</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};