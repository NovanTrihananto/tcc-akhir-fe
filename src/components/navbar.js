import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../service/authcontext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const closeMobileMenu = () => {
    setIsActive(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" onClick={closeMobileMenu}>
          <strong style={{ fontSize: "1.5rem" }}>AplikasiKu</strong>
        </Link>

        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={toggleActiveClass}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          {user && (
            <Link to="/homepage" className="navbar-item" onClick={closeMobileMenu}>
              Beranda
            </Link>
          )}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {!user ? (
              <div className="buttons">
                <Link to="/register" className="button is-primary" onClick={closeMobileMenu}>
                  <strong>Register</strong>
                </Link>
                <Link to="/login" className="button is-light" onClick={closeMobileMenu}>
                  Log in
                </Link>
              </div>
            ) : (
              <div className="buttons">
                <div className="navbar-item has-text-white">Halo, {user.name}</div>
                <button className="button is-light" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
