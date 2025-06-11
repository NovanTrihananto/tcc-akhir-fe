import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../service/api";

const EditBarangPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Nama: "",
    harga: "",
    Img: "",
    Deskripsi: "",
    Kategori: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/barang/${id}`);
        setFormData(res.data);
      } catch (err) {
        alert("Gagal mengambil data barang");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/barang/${id}`, formData);
      alert("Barang berhasil diperbarui");
      navigate("/homepage");
    } catch (err) {
      alert("Gagal memperbarui barang");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-3">Edit Barang</h1>
        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label className="label">Nama Barang</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="Nama"
                value={formData.Nama}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Harga</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Gambar (nama file gambar)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="Img"
                value={formData.Img}
                onChange={handleChange}
              />
            </div>
            <p className="help">Contoh: apel.jpg</p>
          </div>

          <div className="field">
            <label className="label">Deskripsi</label>
            <div className="control">
              <textarea
                className="textarea"
                name="Deskripsi"
                value={formData.Deskripsi}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Kategori</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="Kategori"
                value={formData.Kategori}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field is-grouped mt-5">
            <div className="control">
              <button type="submit" className="button is-primary">
                Simpan Perubahan
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={() => navigate("/homepage")}
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBarangPage;
