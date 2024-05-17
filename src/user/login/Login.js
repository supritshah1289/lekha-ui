import React from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import LoginForm from "./LoginForm";
import "react-toastify/dist/ReactToastify.css";

function Login({ authenticated }) {
  if (authenticated) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to SpringSocial</h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <LoginForm />
        <span className="signup-link">
          New user? <Link to="/signup">Sign up!</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
