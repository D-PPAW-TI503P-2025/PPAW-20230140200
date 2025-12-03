import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    user = jwtDecode(token);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-xl">Presensi App</h1>

      <div className="flex space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/presensi">Presensi</Link>

        {user?.role === "admin" && <Link to="/reports">Laporan Admin</Link>}

        <span className="font-semibold">{user?.nama}</span>

        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;