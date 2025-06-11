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
      login(res.data.data);
      navigate("/homepage");
    } catch (err) {
      alert("Login gagal. Pastikan email & password benar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="hero is-fullheight is-bold"
      style={{
        background: "linear-gradient(135deg, #1f1c2c, #928DAB)",
        color: "#fff",
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop is-6-tablet">
              <div
                className="box p-5"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
                }}
              >
                <h1 className="title has-text-centered has-text-weight-bold mb-5">
                  🔐 Login Akun
                </h1>

                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label has-text-weight-semibold">Email</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="email"
                        name="email"
                        placeholder="Masukkan email"
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label has-text-weight-semibold">Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        name="password"
                        placeholder="Masukkan password"
                        onChange={handleChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock" />
                      </span>
                    </div>
                  </div>

                  <div className="field mt-5">
                    <button
                      className={`button is-primary is-fullwidth is-medium ${
                        loading ? "is-loading" : ""
                      }`}
                      type="submit"
                    >
                      {loading ? "Memproses..." : "Login"}
                    </button>
                  </div>
                </form>

                <p className="has-text-centered mt-4">
                  Belum punya akun? <a href="/register">Daftar</a>
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
