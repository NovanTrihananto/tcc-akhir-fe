import React, { useState, useContext } from "react";
import API from "../service/api";
import { AuthContext } from "../service/authcontext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post("/login", form);
      login(res.data.data); // simpan ke context & localStorage

      navigate("/homepage");
    } catch (err) {
      alert("Login gagal. Pastikan email & password benar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero is-fullheight has-background-light">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <div className="box p-5">
                <h1 className="title is-3 has-text-centered has-text-weight-bold mb-5">
                  Masuk ke Akun Anda
                </h1>

                <form onSubmit={handleSubmit}>
                  {/* Email */}
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        name="email"
                        type="email"
                        placeholder="nama@email.com"
                        onChange={handleChange}
                        required
                        className="input"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        required
                        className="input"
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  {/* Tombol Login */}
                  <div className="field mt-5">
                    <div className="control">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`button is-primary is-fullwidth has-text-weight-semibold ${loading ? "is-loading" : ""}`}
                      >
                        {loading ? "Memproses..." : "Login"}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Link ke Register */}
                <p className="has-text-centered mt-4">
                  Belum punya akun?{" "}
                  <Link to="/register" className="has-text-link has-text-weight-medium">
                    Daftar Sekarang
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
