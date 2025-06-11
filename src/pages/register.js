import axios from "axios";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setgender] = useState("");
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
        role: "user", // default, atau admin sesuai kebutuhan
      });
      setPesan("Registrasi berhasil!");
    } catch (error) {
      console.error("Gagal registrasi:", error.response?.data?.msg || error.message);
      setPesan("Gagal melakukan registrasi.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Form Registrasi</h2>
      <input type="text" placeholder="Nama" value={name} onChange={(e) => setNama(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="gender" placeholder="gender" value={gender} onChange={(e) => setgender(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Daftar</button>
      <p>{pesan}</p>
    </form>
  );
};

export default RegisterPage;
