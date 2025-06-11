import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";

const DetailBarangPage = () => {
  const { id } = useParams();
  const [barang, setBarang] = useState({});
  const [jumlah, setJumlah] = useState(1);
  const [buktiTf, setBuktiTf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const res = await API.get(`/barang/${id}`);
        setBarang(res.data);
      } catch (error) {
        console.error("Error fetching barang:", error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBarang();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const idUser = user?.id;

    if (!idUser) {
      alert("User belum login!");
      setIsLoading(false);
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
    } finally {
      setIsLoading(false);
    }
  };

  const totalHarga = barang.harga ? jumlah * barang.harga : 0;

  if (isLoadingData) {
    return (
      <section className="section">
        <div className="container">
          <div className="has-text-centered">
            <button className="button is-loading is-large is-white">Loading</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          {/* Product Image */}
          <div className="column is-6">
            <div className="card">
              <div className="card-image">
                <figure className="image is-square">
                  {barang.Img ? (
                    <img src={barang.Img} alt={barang.Nama} />
                  ) : (
                    <div className="has-background-grey-light is-flex is-align-items-center is-justify-content-center" style={{height: '100%'}}>
                      <span className="icon is-large has-text-grey">
                        <i className="fas fa-image fa-3x"></i>
                      </span>
                    </div>
                  )}
                </figure>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="column is-6">
            <div className="box">
              <h1 className="title is-2">{barang.Nama}</h1>
              
              <div className="content">
                <p className="subtitle is-4 has-text-primary">
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-money-bill-wave"></i>
                    </span>
                    <span>Rp {barang.harga?.toLocaleString('id-ID')}</span>
                  </span>
                </p>
                
                <div className="tags">
                  <span className="tag is-info is-medium">
                    <span className="icon">
                      <i className="fas fa-tag"></i>
                    </span>
                    <span>{barang.Kategori}</span>
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="title is-5">Deskripsi Produk</h3>
                  <p>{barang.Deskripsi || "Tidak ada deskripsi tersedia."}</p>
                </div>
              </div>

              {/* Purchase Form */}
              <div className="box has-background-light">
                <h3 className="title is-5 has-text-centered">
                  <span className="icon-text">
                    <span className="icon">
                      <i className="fas fa-shopping-cart"></i>
                    </span>
                    <span>Beli Produk</span>
                  </span>
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Jumlah</label>
                    <div className="control">
                      <div className="field has-addons">
                        <div className="control">
                          <button
                            type="button"
                            className="button"
                            onClick={() => setJumlah(Math.max(1, jumlah - 1))}
                          >
                            <span className="icon">
                              <i className="fas fa-minus"></i>
                            </span>
                          </button>
                        </div>
                        <div className="control is-expanded">
                          <input
                            className="input has-text-centered"
                            type="number"
                            value={jumlah}
                            min="1"
                            onChange={(e) => setJumlah(Math.max(1, parseInt(e.target.value) || 1))}
                            required
                          />
                        </div>
                        <div className="control">
                          <button
                            type="button"
                            className="button"
                            onClick={() => setJumlah(jumlah + 1)}
                          >
                            <span className="icon">
                              <i className="fas fa-plus"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="notification is-primary is-light">
                    <strong>Total Harga: Rp {totalHarga.toLocaleString('id-ID')}</strong>
                  </div>

                  <div className="field">
                    <label className="label">Upload Bukti Transfer</label>
                    <div className="control">
                      <div className="file has-name is-fullwidth">
                        <label className="file-label">
                          <input
                            className="file-input"
                            type="file"
                            onChange={(e) => setBuktiTf(e.target.files[0])}
                            accept="image/*"
                            required
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                              Pilih bukti transfer...
                            </span>
                          </span>
                          <span className="file-name">
                            {buktiTf ? buktiTf.name : "Belum ada file dipilih"}
                          </span>
                        </label>
                      </div>
                    </div>
                    <p className="help">
                      Upload bukti transfer dalam format JPG, PNG, atau PDF
                    </p>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className={`button is-success is-fullwidth is-large ${isLoading ? 'is-loading' : ''}`}
                        disabled={isLoading}
                      >
                        <span className="icon">
                          <i className="fas fa-credit-card"></i>
                        </span>
                        <span>Kirim Pembelian</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailBarangPage;