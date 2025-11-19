import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mahasiswa");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        { nama, email, password, role }
      );

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      setNama("");
      setEmail("");
      setPassword("");
      setRole("mahasiswa");
    } catch (err) {
      setError(err.response?.data?.message || "Register gagal");
    }
  };

  return (
    <div className="min-h-screen bg-[#050a1a] text-cyan-300 p-6 grid-bg">
      <style>{`
        .grid-bg {
          background-image: linear-gradient(#0d1b3a 1px, transparent 1px),
                            linear-gradient(90deg, #0d1b3a 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .neon-shadow {
          box-shadow: 0 0 15px #00eaff;
        }
        .neon-text {
          text-shadow: 0 0 8px #00eaff;
        }
      `}</style>

      <div className="max-w-2xl mx-auto mt-16 p-10 bg-[#0b1124] rounded-xl neon-shadow">
        <h2 className="text-3xl mb-6 text-center neon-text">
          REGISTER — CYBERPUNK UI
        </h2>

        <form onSubmit={handleSubmit}>
          {/* NAMA */}
          <label className="block mb-2 mt-4">Nama Lengkap</label>
          <input
            type="text"
            className="w-full p-3 rounded bg-[#091427] border border-cyan-400 text-cyan-300 neon-shadow"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />

          {/* EMAIL */}
          <label className="block mb-2 mt-4">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-[#091427] border border-cyan-400 text-cyan-300 neon-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <label className="block mb-2 mt-4">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-[#091427] border border-cyan-400 text-cyan-300 neon-shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE */}
          <label className="block mb-2 mt-4">Pilih Role</label>
          <select
            className="w-full p-3 rounded bg-[#091427] border border-cyan-400 text-cyan-300 neon-shadow"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="admin">Admin</option>
          </select>

          {/* SUCCESS */}
          {success && (
            <p className="text-green-400 text-center mt-4">{success}</p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center mt-4">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-cyan-300 text-black rounded-lg font-bold neon-shadow hover:scale-105 transition"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
