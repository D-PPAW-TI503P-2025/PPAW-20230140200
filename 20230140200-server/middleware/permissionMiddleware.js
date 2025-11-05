// Middleware untuk menambahkan data user dummy
exports.addUserData = (req, res, next) => {
  console.log('Middleware: Menambahkan data user dari request body...');

  req.user = {
    id: req.body.userId || 123,                 
    nama: req.body.nama || 'Admin Default',     
    role: req.body.role || 'admin'              
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