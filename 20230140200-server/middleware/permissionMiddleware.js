// middleware/permissionMiddleware.js

// Middleware untuk menambahkan data user ke request (dummy dulu)
function addUserData(req, res, next) {
  req.user = {
    id: 1,
    nama: "Admin",
    role: "admin", // tambahkan role supaya bisa dicek
  };
  next();
}

// Middleware untuk cek admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next(); // lanjut ke controller
  }
  res.status(403).json({ message: "Akses ditolak. Hanya admin yang bisa." });
}

module.exports = { addUserData, isAdmin };
