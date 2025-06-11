import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarangList from "../components/Baranglist";
import { AuthContext } from "../service/authcontext";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <strong>TokoOnline</strong>
          </Link>
        </div>

        <div className="navbar-menu is-active">
          <div className="navbar-start">
            {/* Bisa tambahkan link lain di sini */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <span className="mr-3">
                {user ? `Login sebagai: ${user.role}` : ""}
              </span>
              <button className="button is-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <section className="section has-background-light min-height-full">
        <div className="container">
          <div className="columns is-vcentered is-mobile is-multiline mb-5">
            <div className="column is-12-tablet is-8-desktop">
              <h1 className="title is-3 has-text-dark">Toko Online</h1>
              {user && (
                <p className="subtitle is-6 has-text-grey">
                  Halo, <strong className="capitalize">{user.role}</strong>!
                </p>
              )}
            </div>

            {user?.role === "admin" && (
              <div className="column is-12-tablet is-4-desktop has-text-right">
                <Link to="/tambah-barang" className="button is-primary is-medium">
                  + Tambah Barang
                </Link>
              </div>
            )}
          </div>

          <BarangList role={user?.role || "user"} />
        </div>
      </section>
    </>
  );
};

export default HomePage;
