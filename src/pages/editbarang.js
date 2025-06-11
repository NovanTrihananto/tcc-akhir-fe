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
    <div className="container">
      <h2>Edit Barang</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Barang:</label>
          <input type="text" name="Nama" value={formData.Nama} onChange={handleChange} required />
        </div>
        <div>
          <label>Harga:</label>
          <input type="number" name="harga" value={formData.harga} onChange={handleChange} required />
        </div>
        <div>
          <label>Gambar (URL):</label>
          <input type="text" name="Img" value={formData.Img} onChange={handleChange} />
        </div>
        <div>
          <label>Deskripsi:</label>
          <textarea name="Deskripsi" value={formData.Deskripsi} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Kategori:</label>
          <input type="text" name="Kategori" value={formData.Kategori} onChange={handleChange} required />
        </div>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditBarangPage;
