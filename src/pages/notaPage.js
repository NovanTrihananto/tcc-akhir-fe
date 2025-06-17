import React, { useEffect, useState } from "react";
import API from "../service/api"; // Pastikan path ini benar

const NotaAdminPage = () => {
  const [notas, setNotas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State untuk modal gambar

  // Fungsi untuk mengambil semua data nota dari server
  const fetchNotas = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/nota");
      // Mengurutkan nota dari yang terbaru
      const sortedNotas = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotas(sortedNotas);
    } catch (err) {
      console.error("Error fetching notas:", err);
      setError("Gagal memuat data nota. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotas();
  }, []);

  // Fungsi untuk update status nota (approve/reject)
  const handleUpdateStatus = async (id, newStatus) => {
    const originalNotas = [...notas];
    
    // Update UI secara optimis untuk responsivitas
    setNotas(notas.map(n => n.id === id ? { ...n, pembayaran: newStatus } : n));

    try {
      await API.put(`/nota/${id}`, { pembayaran: newStatus });
      alert(`Nota berhasil diubah menjadi "${newStatus}"!`);
    } catch (err) {
      alert(`Gagal mengubah status nota. Mengembalikan ke status semula.`);
      console.error("Error updating status:", err);
      // Jika gagal, kembalikan state ke semula
      setNotas(originalNotas);
    }
  };
  
  // Fungsi untuk membuka modal
  const openImageModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  // Fungsi untuk menutup modal
  const closeImageModal = () => {
    setModalImage(null);
  };

  // Helper untuk memberikan warna pada tag status
  const getStatusTagColor = (pembayaran) => {
    switch (pembayaran?.toLowerCase()) {
      case "lunas":
        return "is-success";
      case "ditolak":
        return "is-danger";
      case "pending":
      default:
        return "is-warning";
    }
  };

  if (isLoading) {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <button className="button is-loading is-large is-white">Loading Data...</button>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="notification is-danger">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section">
        <div className="container mt-5">
          <h1 className="title">Manajemen Nota Pembelian</h1>
          <p className="subtitle">Daftar semua transaksi yang dilakukan oleh pengguna.</p>

          <div className="table-container">
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Nama User</th>
                  <th>Nama Barang</th>
                  <th className="has-text-right">Jumlah</th>
                  <th className="has-text-right">Total Harga</th>
                  <th className="has-text-centered">Status</th>
                  <th className="has-text-centered">Bukti TF</th>
                  <th className="has-text-centered">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {notas.length > 0 ? (
                  notas.map((nota, index) => (
                    <tr key={nota.id}>
                      <td>{index + 1}</td>
                      <td>{new Date(nota.createdAt).toLocaleDateString("id-ID")}</td>
                      <td>{nota.user?.name || "N/A"}</td>
                      <td>{nota.barang?.Nama || "N/A"}</td>
                      <td className="has-text-right">{nota.Jumlah}</td>
                      <td className="has-text-right">Rp {nota.harga?.toLocaleString("id-ID") || 0}</td>
                      <td className="has-text-centered">
                        <span className={`tag ${getStatusTagColor(nota.pembayaran)}`}>
                          {nota.pembayaran || "pending"}
                        </span>
                      </td>
                      <td className="has-text-centered">
                        <button 
                          className="button is-info is-small" 
                          onClick={() => openImageModal(nota.buktitf)}
                          disabled={!nota.buktitf}
                        >
                          Lihat
                        </button>
                      </td>
                      <td className="has-text-centered">
                        <div className="buttons are-small is-centered">
                          <button 
                            className="button is-success"
                            onClick={() => handleUpdateStatus(nota.id, 'lunas')}
                            disabled={nota.pembayaran === 'lunas'}
                          >
                            Approve
                          </button>
                          <button 
                            className="button is-danger"
                            onClick={() => handleUpdateStatus(nota.id, 'ditolak')}
                            disabled={nota.pembayaran === 'ditolak'}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="has-text-centered">
                      Belum ada data nota pembelian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal untuk menampilkan gambar bukti transfer */}
      <div className={`modal ${modalImage ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={closeImageModal}></div>
        <div className="modal-content">
          <p className="image">
            <img src={modalImage} alt="Bukti Transfer" />
          </p>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closeImageModal}></button>
      </div>
    </>
  );
};

export default NotaAdminPage;