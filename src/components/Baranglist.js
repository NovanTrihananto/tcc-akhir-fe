import React, { useEffect, useState } from "react";
import API from "../service/api";
import { Link } from "react-router-dom";

// Ambil role dari localStorage (atau ganti sesuai implementasi kamu)
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || "user";
};

const BarangList = () => {
  const [barang, setBarang] = useState([]);
  const role = getUserRole();

  useEffect(() => {
    API.get("/barang")
      .then((res) => setBarang(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus barang ini?");
    if (!confirm) return;

    try {
      await API.delete(`/barang/${id}`);
      setBarang(barang.filter((item) => item.id !== id));
    } catch (error) {
      alert("Gagal menghapus barang");
      console.error(error);
    }
  };

  return (
    <div className="barang-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {barang.map((item) => (
    <div
      key={item.id}
      className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
    >
      {/* Gambar Barang */}
      <img
        src={`http://localhost:5000/uploads/${item.Img}`}
        alt={item.Nama}
        className="w-full h-48 object-cover rounded mb-2"
      />

      <h3 className="text-lg font-semibold">{item.Nama}</h3>
      <p className="text-gray-600">{item.Deskripsi}</p>
      <p className="font-bold">Harga: Rp{item.harga.toLocaleString()}</p>

      <div className="mt-3 space-x-2">
        {role === "admin" ? (
          <>
            <Link
              to={`/admin/edit-barang/${item.id}`}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Hapus
            </button>
          </>
        ) : (
          <Link
            to={`/barang/${item.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Beli Sekarang
          </Link>
        )}
      </div>
    </div>
  ))}
</div>

  );
};

export default BarangList;
