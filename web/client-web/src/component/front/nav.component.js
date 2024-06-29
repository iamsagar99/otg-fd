import React from "react";
import { FaSun, FaChevronDown, FaBars, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";

export const MenuComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user"));
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaBars /> Logo
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link active">
          Home
        </NavLink>
        <NavLink to="/sendmoney" className="navbar-link">
          Send Money
        </NavLink>
        <NavLink to="#" className="navbar-link">
          Contact us
        </NavLink>
      </div>
      <div className="navbar-icons">
        {!localUser && (
          <NavLink className="nav-link text-light navitem mx-1" to="/login">
            <button className="login-button">
              <FaUser className="login-icon" /> Login
            </button>
          </NavLink>
        )}
        {localUser && (
          <>
            <span className="user-name"><NavLink className="user-name" to='/profile'>{localUser.name}</NavLink></span>
            <div className="profile-dropdown">
              <FaUser className="profile-icon" />
              <div className="dropdown-content">
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("auth_user");
                    localStorage.removeItem("auth_token");
                    navigate("/login");
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          </>
        )}
        <FaSun />
      </div>
    </nav>
  );
};

