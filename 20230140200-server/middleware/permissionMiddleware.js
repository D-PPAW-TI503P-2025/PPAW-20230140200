// middleware/permissionMiddleware.js
exports.addUserData = (req, res, next) => {
  const body = req.body || {};
  const headers = req.headers || {};

  req.user = {
    id: body.userId || headers['x-user-id'] || 123,
    nama: body.nama || headers['x-user-nama'] || 'Admin',
    role: body.role || headers['x-user-role'] || 'admin'
  };
  next();
};

// Middleware untuk cek apakah user adalah admin
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('Middleware: Izin admin diberikan.');
    next();
  } else {
    console.log('Middleware: Gagal! Pengguna bukan admin.');
    return res.status(403).json({ message: 'Akses ditolak: Hanya untuk admin' });
  }
};
