import React from "react";
import "./Signup.css";
import { Link, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./SignupForm";
import SocialLogin from "../login/SocialLogin"; //login and sign up component

function Signup({ authenticated }) {
  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Signup with SpringSocial</h1>
        <SocialLogin />
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <SignupForm />
        <span className="login-link">
          Already have an account? <Link to="/login">Login!</Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
