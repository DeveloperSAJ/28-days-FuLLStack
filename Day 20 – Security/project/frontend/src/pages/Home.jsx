import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaShieldAlt, FaDatabase, FaBolt } from "react-icons/fa";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user already logged in → redirect to dashboard
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="landing-container container">
      {/* Hero Section */}
      <div className="hero-section" style={{ textAlign: "center", padding: "50px 20px" }}>
        <h1 style={{ fontSize: "36px", color: "white", marginBottom: 20 }}>Welcome to AuthSystem</h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.85)", maxWidth: 500, margin: "0 auto 30px" }}>
          A modern, secure authentication system built with JWT, Node.js, and PostgreSQL.
          Experience seamless and secure user management.
        </p>

        {/* CTA Buttons */}
        <div className="cta-buttons" style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "50px" }}>
          <a href="/login" className="btn btn-primary">
            <FaSignInAlt /> Login
          </a>
          <a href="/register" className="btn btn-outline" style={{
            border: "2px solid white",
            color: "white",
            padding: "12px 24px",
            borderRadius: "10px",
            fontWeight: 500,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "var(--primary-color)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "white";
          }}
          >
            <FaUserPlus /> Register
          </a>
        </div>

        {/* Features Section */}
        <div className="features" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <div className="feature" style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            padding: "30px",
            color: "white",
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <FaShieldAlt size={36} style={{ marginBottom: 15 }} />
            <h3 style={{ marginBottom: 10 }}>Secure JWT Auth</h3>
            <p style={{ fontSize: 14 }}>Industry-standard JWT tokens for secure authentication</p>
          </div>

          <div className="feature" style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            padding: "30px",
            color: "white",
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <FaDatabase size={36} style={{ marginBottom: 15 }} />
            <h3 style={{ marginBottom: 10 }}>PostgreSQL</h3>
            <p style={{ fontSize: 14 }}>Robust and reliable database management</p>
          </div>

          <div className="feature" style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            padding: "30px",
            color: "white",
            textAlign: "center",
            backdropFilter: "blur(10px)"
          }}>
            <FaBolt size={36} style={{ marginBottom: 15 }} />
            <h3 style={{ marginBottom: 10 }}>Fast & Responsive</h3>
            <p style={{ fontSize: 14 }}>Optimized performance with modern UI</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="auth-footer" style={{ marginTop: 50 }}>
        <p>© {new Date().getFullYear()} AuthSystem. All rights reserved.</p>
      </div>
    </div>
  );
};