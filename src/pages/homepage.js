import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import BarangList from "../components/Baranglist";
import { AuthContext } from "../service/authcontext";

const HomePage = () => {
  const { user } = useContext(AuthContext); // logout dan navigate tidak digunakan di JSX, bisa dihilangkan jika tidak ada fungsi lain
  const content = "Selamat datang di AplikasiKu, temukan barang favoritmu di sini.";

  return (
    // Gunakan React Fragment (<>) untuk mengelompokkan dua section utama
    <>
      {/* ==================== 1. Hero Banner Section ==================== */}
      {/* Banner ini berfungsi sebagai header halaman yang menarik dan informatif */}
      <section className="hero is-primary is-medium">
        <div className="hero-body">
          <div className="container">
            {/* Menggunakan 'columns' untuk alignment yang lebih baik antara judul dan tombol */}
            <div className="columns is-vcentered">
              <div className="column">
                <h1 className="title is-1">Toko Online</h1>
                <p className="subtitle is-4 mt-3">
                  {user ? (
                    <>
                      Halo, <strong className="has-text-weight-semibold" style={{ textTransform: 'capitalize' }}>{user.name}</strong>!
                      <br />
                      {content}
                    </>
                  ) : (
                    "Selamat datang di AplikasiKu. Silakan login untuk berbelanja."
                  )}
                </p>
              </div>

              {/* Tombol 'Tambah Barang' untuk admin, diletakkan di kolom terpisah di sebelah kanan */}
              {user?.role === "admin" && (
                <div className="column is-narrow">
                  <Link
                    to="/tambah-barang"
                    className="button is-light is-outlined is-large" // Tombol dengan style yang kontras
                  >
                    <span className="icon">
                      <i className="fas fa-plus"></i>
                    </span>
                    <span>Tambah Barang</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. Product List Section ==================== */}
      {/* Bagian ini memiliki latar belakang netral, sama seperti halaman Nota */}
      <section className="section">
        <div className="container">
          {/* Judul untuk daftar produk */}
          <h2 className="title is-3 has-text-centered mb-5">Daftar Produk</h2>
          
          {/* Komponen daftar barang Anda */}
          <BarangList role={user?.role || "user"} />
        </div>
      </section>
    </>
  );
};

export default HomePage;