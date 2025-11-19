import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Login gagal");
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

      <div className="max-w-md mx-auto mt-24 p-10 bg-[#0b1124] rounded-xl neon-shadow">
        <h2 className="text-3xl mb-6 text-center neon-text">LOGIN — CYBERPUNK</h2>

        <form onSubmit={handleSubmit}>

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

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-center mt-4 neon-text">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-cyan-300 text-black rounded-lg font-bold neon-shadow hover:scale-105 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
