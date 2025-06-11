import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../service/authcontext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-lg fixed top-0 w-full z-50">
  <div className="container mx-auto flex items-center justify-between">
    <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300">
      🛍️ TokoOnline
    </Link>
    <div className="flex items-center gap-4">
      {!user ? (
        <>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </>
      ) : (
        <>
          <span className="text-sm">Halo, <b>{user.name}</b></span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full text-sm"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</nav>
  );
};

export default Navbar;
