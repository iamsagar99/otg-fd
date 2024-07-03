import React from "react";
import { FaSun, FaChevronDown, FaBars, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";
import { calcFacts } from "../../services/facts.service";
import { toast } from "react-toastify";
import logo from "../../assets/image/logo-modified.png"

export const MenuComponent = () => {
  const localUser = JSON.parse(localStorage.getItem("auth_user"));
  const navigate = useNavigate();


  const handlelogout = async() => {
    const response = await calcFacts();
    if(response.status){
      toast.success("Logout Successfully")
      console.log(response.result)
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      navigate("/login");
    }else{
      toast.error("Logout Failed")
    }
  }
  
  return (
    <nav className="navbar">
      {/* put image as logo here */}
      <div className="navbar-logo">
        <img src={logo} alt="logo" width="75px" height="75px" />
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link active">
          Home
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
          <NavLink to="/user/sendmoney" className="navbar-link">
          Send Money
        </NavLink>
        <NavLink to="/user/transaction-history" className="navbar-link">
          Statements
        </NavLink>
            <span className="user-name"><NavLink className="user-name" to='/user/profile'>{localUser.name}</NavLink></span>
            <div className="profile-dropdown">
              <FaUser className="profile-icon" />
              <div className="dropdown-content">
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    handlelogout()
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

