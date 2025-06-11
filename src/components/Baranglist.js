import React, { useEffect, useState } from "react";
import API from "../service/api";
import { Link } from "react-router-dom";

const BarangList = ({ role }) => {
  const [barang, setBarang] = useState([]);

  useEffect(() => {
    API.get("/barang")
      .then((res) => setBarang(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus barang ini?")) return;

    try {
      await API.delete(`/barang/${id}`);
      setBarang(barang.filter((item) => item.id !== id));
    } catch (error) {
      alert("Gagal menghapus barang");
    }
  };

  return (
    <div className="columns is-multiline">
      {barang.map((item) => (
        <div key={item.id} className="column is-12-mobile is-6-tablet is-4-desktop">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src={`http://localhost:5000/uploads/${item.Img}`}
                  alt={item.Nama}
                  style={{ objectFit: "cover" }}
                />
              </figure>
            </div>
            <div className="card-content">
              <p className="title is-5">{item.Nama}</p>
              <p className="subtitle is-6 has-text-grey">{item.Deskripsi}</p>
              <p className="has-text-weight-bold mb-3">
                Harga: Rp{item.harga.toLocaleString()}
              </p>

              <div className="buttons">
                {role === "admin" ? (
                  <>
                    <Link
                      to={`/edit-barang/${item.id}`}
                      className="button is-warning is-small"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="button is-danger is-small"
                    >
                      Hapus
                    </button>
                  </>
                ) : (
                  <Link
                    to={`/barang/${item.id}`}
                    className="button is-link is-small"
                  >
                    Beli Sekarang
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarangList;
