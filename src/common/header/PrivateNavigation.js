import React from "react";
import { NavLink } from "react-router-dom";

function PrivateNavigation({ onLogout }) {
  return (
    <ul>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={onLogout}>
          logout
        </NavLink>
      </li>
    </ul>
  );
}

export default PrivateNavigation;
