const express = require("express");
const router = express.Router();

let presensiData = {};

// POST /presensi/check-in
router.post("/check-in", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId wajib diisi" });

  const today = new Date().toLocaleDateString();

  if (presensiData[userId] && presensiData[userId][today]?.checkIn) {
    return res.status(400).json({
      message: "Check-in hanya bisa dilakukan 1 kali per hari!",
    });
  }

  if (!presensiData[userId]) presensiData[userId] = {};
  presensiData[userId][today] = {
    checkIn: new Date().toLocaleTimeString(),
    checkOut: null,
  };

  res.json({
    message: "Berhasil check-in!",
    data: presensiData[userId][today],
  });
});

// POST /presensi/check-out
router.post("/check-out", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "userId wajib diisi" });

  const today = new Date().toLocaleDateString();

  // Cek apakah sudah pernah check-in
  if (!presensiData[userId] || !presensiData[userId][today]?.checkIn) {
    return res.status(400).json({
      message: "Tidak bisa check-out karena belum check-in!",
    });
  }

  // 🚫 Tambahkan pengecekan kalau sudah pernah check-out
  if (presensiData[userId][today].checkOut) {
    return res.status(400).json({
      message: "Sudah melakukan check-out hari ini!",
    });
  }

  // Simpan waktu check-out
  presensiData[userId][today].checkOut = new Date().toLocaleTimeString();

  res.json({
    message: "Berhasil check-out!",
    data: presensiData[userId][today],
  });
});


// GET /presensi/reports/daily
router.get("/reports/daily", (req, res) => {
  res.json({
    message: "Laporan harian presensi",
    data: presensiData,
  });
});

module.exports = router;
