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
    <section className="section has-background-white-ter">
      <div className="container">
        <div className="box" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="title is-4 has-text-primary mb-4">{barang.Nama}</h2>

          <figure className="image is-3by2 mb-4">
            <img
              src={barang.Img || "https://via.placeholder.com/500x300"}
              alt={barang.Nama}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </figure>

          <p className="subtitle is-6 has-text-grey">
            Kategori: <strong>{barang.Kategori || "Umum"}</strong>
          </p>
          <p className="mb-2">Harga per pcs: <strong>Rp{barang.harga}</strong></p>
          <p className="mb-4">{barang.Deskripsi}</p>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="field">
              <label className="label">Jumlah</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={jumlah}
                  min="1"
                  onChange={(e) => setJumlah(e.target.value)}
                  required
                />
              </div>
            </div>

            <p className="mb-4">
              <strong>Total Harga: Rp{totalHarga}</strong>
            </p>

            <div className="field">
              <label className="label">Upload Bukti Transfer</label>
              <div className="file is-primary has-name is-fullwidth">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    onChange={(e) => setBuktiTf(e.target.files[0])}
                    required
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">Pilih File</span>
                  </span>
                  <span className="file-name">
                    {buktiTf?.name || "Belum ada file dipilih"}
                  </span>
                </label>
              </div>
            </div>

            <div className="field is-grouped is-grouped-right mt-5">
              <p className="control">
                <button type="submit" className="button is-primary">
                  Kirim Pembelian
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DetailBarangPage;
