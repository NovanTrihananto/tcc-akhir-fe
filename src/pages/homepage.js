import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BarangList from "../components/Baranglist";
import { AuthContext } from "../service/authcontext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Toko Online</h1>
            {user && (
              <p className="text-gray-600 text-sm mt-1">
                Halo, <span className="font-medium capitalize">{user.role}</span>!
              </p>
            )}
          </div>

          {user?.role === "admin" && (
            <Link
              to="/tambah-barang"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200"
            >
              + Tambah Barang
            </Link>
          )}
        </div>

        <BarangList role={user?.role || "user"} />
      </div>
    </div>
  );
};

export default HomePage;
