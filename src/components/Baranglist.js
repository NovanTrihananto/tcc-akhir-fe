import React, { useEffect, useState } from "react";
import API from "../service/api";
import { Link } from "react-router-dom";

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || "user";
};

const BarangList = () => {
  const [barang, setBarang] = useState([]);
  const role = getUserRole();

  useEffect(() => {
    API.get("/barang")
      .then((res) => setBarang(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus barang ini?");
    if (!confirm) return;

    try {
      await API.delete(`/barang/${id}`);
      setBarang(barang.filter((item) => item.id !== id));
    } catch (error) {
      alert("Gagal menghapus barang");
      console.error(error);
    }
  };

  return (
    <div className="columns is-multiline">
      {barang.map((item) => (
        <div key={item.id} className="column is-12-mobile is-6-tablet is-4-desktop">
          <div className="card" style={{ height: "100%" }}>
            {/* Gambar barang */}
            <div className="card-image">
              <figure
                className="image"
                style={{
                  height: "200px",
                  overflow: "hidden",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              >
                <img
                  src={`https://betcc-700231807331.us-central1.run.app/uploads/${item.Img}`}
                  alt={item.Nama}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "inherit",
                  }}
                />
              </figure>
            </div>

            {/* Konten */}
            <div className="card-content">
              <p className="title is-5 has-text-weight-semibold">{item.Nama}</p>
              <p className="subtitle is-6 has-text-grey">{item.Deskripsi}</p>
              <p className="has-text-weight-bold has-text-success">
                Rp {item.harga.toLocaleString()}
              </p>
            </div>

            {/* Tombol aksi */}
<footer className="card-footer">
              {role === "admin" ? (
                <>
                  <Link to={`/edit-barang/${item.id}`} className="card-footer-item has-text-warning">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="card-footer-item has-text-danger"
                    style={{ border: "none", background: "none", cursor: "pointer" }}
                  >
                    Hapus
                  </button>
                </>
              ) : (
                <Link to={`/barang/${item.id}`} className="card-footer-item has-text-link">
                  Beli Sekarang
                </Link>
              )}
            </footer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarangList;