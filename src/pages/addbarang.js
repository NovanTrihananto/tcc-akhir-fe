import React, { useState } from "react";
import API from "../service/api";


const AddBarangPage = () => {
  const [Nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [Img, setImg] = useState(null);
  const [Deskripsi, setDeskripsi] = useState("");
  const [Kategori, setKategori] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("Nama", Nama);
    formData.append("harga", harga);
    formData.append("Deskripsi", Deskripsi);
    formData.append("Kategori", Kategori);
    formData.append("Img", Img); // dari input file

    await API.post("/barang", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setMessage("Barang berhasil ditambahkan!");

    // Reset form
    setNama("");
    setHarga("");
    setImg(null);
    setDeskripsi("");
    setKategori("");
  } catch (error) {
    setMessage(error.response?.data?.message || "Gagal menambahkan barang.");
  }
};


  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Tambah Barang</h1>
      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nama Barang</label>
          <input
            type="text"
            value={Nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Harga</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Gambar</label>
          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            value={Deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Kategori</label>
          <input
            type="text"
            value={Kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Simpan Barang
        </button>
      </form>
    </div>
  );
};

export default AddBarangPage;
