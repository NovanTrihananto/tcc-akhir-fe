import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        gender,
        password,
        role: "user", // default
      });
      setPesan("✅ Registrasi berhasil!");
      // Optionally redirect ke login di sini
    } catch (error) {
      console.error("Gagal registrasi:", error.response?.data?.msg || error.message);
      setPesan("❌ Gagal melakukan registrasi.");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "500px" }}>
        <h1 className="title has-text-centered">Registrasi</h1>

        {pesan && (
          <div
            className={`notification ${
              pesan.includes("berhasil") ? "is-success" : "is-danger"
            }`}
          >
            {pesan}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email aktif"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Jenis Kelamin</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered mt-4">
            <div className="control">
              <button type="submit" className="button is-primary">
                Daftar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
