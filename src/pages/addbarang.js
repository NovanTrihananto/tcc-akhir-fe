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
      formData.append("Img", Img);

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
    <section className="section">
      <div className="container">
        <div className="box" style={{ maxWidth: 600, margin: "0 auto" }}>
          <h1 className="title is-3 has-text-centered">Tambah Barang</h1>

          {message && (
            <div className={`notification ${message.includes("berhasil") ? "is-success" : "is-danger"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nama Barang</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={Nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  placeholder="Masukkan nama barang"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Harga</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  required
                  placeholder="Contoh: 150000"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Gambar</label>
              <div className="file has-name is-fullwidth">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                    accept="image/*"
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Pilih Gambar…</span>
                  </span>
                  <span className="file-name">
                    {Img ? Img.name : "Belum ada file"}
                  </span>
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">Deskripsi</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={Deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Tuliskan deskripsi barang"
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Kategori</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={Kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  required
                  placeholder="Contoh: Elektronik, Fashion"
                />
              </div>
            </div>

            <div className="field is-grouped is-justify-content-end">
              <div className="control">
                <button type="submit" className="button is-primary">
                  Simpan Barang
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBarangPage;
