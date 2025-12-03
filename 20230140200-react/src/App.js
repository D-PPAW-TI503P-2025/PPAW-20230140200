import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import PresensiPage from './components/PresensiPage';
import AdminPage from './components/AdminPage'; // ⬅️ Tambahkan AdminPage

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50 font-sans">
        {/* ===== Navbar Soft Brown Theme ===== */}
        <nav className="bg-amber-200 p-4 flex justify-between items-center rounded-b-2xl shadow-md">
          <h1 className="text-xl font-bold text-amber-900">
            PAW
          </h1>
          <div className="space-x-3">
            <Link
              to="/login"
              className="bg-amber-400 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-300 hover:bg-yellow-400 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              Register
            </Link>
            <Link
              to="/presensi"
              className="bg-amber-300 hover:bg-amber-400 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              Presensi
            </Link>
            <Link
              to="/admin"
              className="bg-amber-400 hover:bg-amber-500 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors"
            >
              Admin
            </Link>
          </div>
        </nav>

        <div className="p-4 max-w-4xl mx-auto mt-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/presensi" element={<PresensiPage />} />
            <Route path="/admin" element={<AdminPage />} /> {/* ⬅️ Route Admin */}
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;