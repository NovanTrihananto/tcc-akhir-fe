import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";

const DetailBarangPage = () => {
  const { id } = useParams();
  const [barang, setBarang] = useState({});
  const [jumlah, setJumlah] = useState(1);
  const [buktiTf, setBuktiTf] = useState(null);

  useEffect(() => {
    API.get(`/barang/${id}`).then((res) => setBarang(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const idUser = user?.id;

    if (!idUser) {
      alert("User belum login!");
      return;
    }

    const formData = new FormData();
    formData.append("idUser", idUser);
    formData.append("idbarang", id);
    formData.append("Jumlah", jumlah);
    formData.append("buktitf", buktiTf);

    try {
      await API.post("/nota", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Pembelian berhasil!");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal membeli barang.");
    }
  };

  const totalHarga = barang.harga ? jumlah * barang.harga : 0;

  return (
    <div>
      <h2>{barang.Nama}</h2>
      <p>Harga per pcs: Rp{barang.harga}</p>
      <p>{barang.Deskripsi}</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Jumlah:</label>
        <input
          type="number"
          value={jumlah}
          min="1"
          onChange={(e) => setJumlah(e.target.value)}
          required
        />

        <p><strong>Total Harga: Rp{totalHarga}</strong></p>

        <label>Upload Bukti Transfer:</label>
        <input type="file" onChange={(e) => setBuktiTf(e.target.files[0])} required />

        <button type="submit">Kirim Pembelian</button>
      </form>
    </div>
  );
};

export default DetailBarangPage;
