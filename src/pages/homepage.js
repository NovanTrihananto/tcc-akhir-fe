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
    // Gunakan 'section' untuk padding standar dan 'has-background-light' untuk warna latar
    <section className="section has-background-light" style={{ minHeight: 'calc(100vh - 80px)' }}> 
      {/* 'container' untuk membatasi lebar konten dan membuatnya terpusat */}
      <div className="container">
        
        {/* Gunakan 'level' untuk menyusun item secara horizontal (kiri dan kanan) */}
        <div className="level mb-6">
          {/* Sisi kiri dari level */}
          <div className="level-left">
            <div className="level-item">
              <div>
                {/* Gunakan 'title' dan 'subtitle' untuk hierarki teks yang jelas */}
                <h1 className="title is-2 has-text-grey-darker">Toko Online</h1>
                {user && (
                  <p className="subtitle is-5 has-text-grey">
                    Halo, <strong className="has-text-weight-semibold success" style={{textTransform: 'capitalize'}}>{user.role}</strong>!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sisi kanan dari level */}
          <div className="level-right">
            <div className="level-item">
              {/* Tombol akan muncul di sini jika user adalah admin */}
              {user?.role === "admin" && (
                <Link
                  to="/tambah-barang"
                  className="button is-primary is-medium" // Kelas tombol Bulma
                >
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span>Tambah Barang</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Komponen daftar barang tetap sama */}
        <BarangList role={user?.role || "user"} />
      </div>
    </section>
  );
};

export default HomePage;