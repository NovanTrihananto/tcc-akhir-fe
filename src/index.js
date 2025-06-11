import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from "./service/authcontext";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


// Ambil elemen root
const container = document.getElementById("root");

// Buat root baru menggunakan React 18 API
const root = createRoot(container);

// Render aplikasi
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
