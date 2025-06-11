import React, { useState } from "react";
import API from "../service/api";

const AddBarangPage = () => {
  const [Nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [Img, setImg] = useState(null);
  const [Deskripsi, setDeskripsi] = useState("");
  const [Kategori, setKategori] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8-desktop is-10-tablet">
            <div className="box">
              <h1 className="title is-3 has-text-centered mb-6">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-plus-circle"></i>
                  </span>
                  <span>Tambah Barang</span>
                </span>
              </h1>
              
              {message && (
                <div className={`notification ${message.includes('berhasil') ? 'is-success' : 'is-danger'} is-light`}>
                  <button className="delete" onClick={() => setMessage("")}></button>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Nama Barang</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Masukkan nama barang"
                      value={Nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-tag"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Harga</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="number"
                      placeholder="Masukkan harga"
                      value={harga}
                      onChange={(e) => setHarga(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-dollar-sign"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Gambar</label>
                  <div className="control">
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
                          <span className="file-label">
                            Pilih gambar...
                          </span>
                        </span>
                        <span className="file-name">
                          {Img ? Img.name : "Belum ada file dipilih"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <p className="help">Format yang didukung: JPG, PNG, GIF (Max 5MB)</p>
                </div>

                <div className="field">
                  <label className="label">Deskripsi</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      placeholder="Masukkan deskripsi barang"
                      value={Deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      rows="4"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Kategori</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Masukkan kategori"
                      value={Kategori}
                      onChange={(e) => setKategori(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-list"></i>
                    </span>
                  </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button
                      type="button"
                      className="button is-light"
                      onClick={() => window.history.back()}
                    >
                      Batal
                    </button>
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                      disabled={isLoading}
                    >
                      <span className="icon">
                        <i className="fas fa-save"></i>
                      </span>
                      <span>Simpan Barang</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddBarangPage;