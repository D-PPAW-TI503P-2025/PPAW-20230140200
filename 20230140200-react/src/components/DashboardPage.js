import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d0f18] flex items-center justify-center px-4 relative overflow-hidden">

      {/* --- Cyberpunk Glowing Grid --- */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(0,140,255,0.2),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,140,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,140,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* --- CARD UTAMA --- */}
      <div className="relative bg-[#11121c] bg-opacity-90 border border-cyan-400/40 rounded-xl p-10 shadow-[0_0_25px_rgba(0,180,255,0.35)] max-w-md w-full text-center">

        <h1 className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_10px_#00eaff] mb-3">
          Dashboard
        </h1>

        <p className="text-gray-300 tracking-wide mb-10">
          Anda Berhasil Login!
        </p>

        <button
          onClick={handleLogout}
          className="w-full py-3 px-6 font-semibold rounded-md border border-cyan-400/60 text-cyan-300 
            hover:bg-cyan-500 hover:text-black transition-all duration-300
            shadow-[0_0_10px_rgba(0,200,255,0.5)]"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default DashboardPage;
