import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homepage";
import DetailBarangPage from "./pages/detailbarang";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AddBarangPage from "./pages/addbarang";
import EditBarangPage from "./pages/editbarang";
import { AuthContext } from "./service/authcontext";
import { useContext } from "react";
import "bulma/css/bulma.min.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";


// Komponen khusus untuk route admin
const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "admin" ? children : <Navigate to="/homepage" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/barang/:id" element={<DetailBarangPage />} />

        {/* Admin-only routes */}
        <Route
          path="/tambah-barang"
          element={
            <AdminRoute>
              <AddBarangPage />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-barang/:id"
          element={
            <AdminRoute>
              <EditBarangPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
