const { Presensi } = require("../models");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

// ===================== GET ALL =====================
exports.getAllPresensi = async (req, res) => {
  try {
    const data = await Presensi.findAll();
    res.json({ message: "List presensi", data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// ===================== GET BY ID =====================
exports.getPresensiById = async (req, res) => {
  try {
    const id = req.params.id;
    const rec = await Presensi.findByPk(id);
    if (!rec) return res.status(404).json({ message: "Presensi tidak ditemukan" });
    res.json({ message: "Detail presensi", data: rec });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// ===================== CHECK IN =====================
exports.CheckIn = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const existingRecord = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Anda sudah melakukan check-in hari ini." });
    }

    const newRecord = await Presensi.create({
      userId,
      nama: userName,
      checkIn: waktuSekarang,
    });

    res.status(201).json({
      message: `Halo ${userName}, check-in berhasil pukul ${format(waktuSekarang, "HH:mm:ss", { timeZone })} WIB`,
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// ===================== CHECK OUT =====================
exports.CheckOut = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const recordToUpdate = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (!recordToUpdate) {
      return res.status(404).json({ message: "Belum ada check-in yang aktif." });
    }

    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();

    res.json({
      message: `Check-out berhasil ${userName} pukul ${format(waktuSekarang, "HH:mm:ss", { timeZone })} WIB`,
      data: recordToUpdate,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// ===================== UPDATE =====================
exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const { checkIn, checkOut, nama } = req.body;

    const recordToUpdate = await Presensi.findByPk(presensiId);
    if (!recordToUpdate) {
      return res.status(404).json({ message: "Catatan presensi tidak ditemukan." });
    }

    recordToUpdate.checkIn = checkIn || recordToUpdate.checkIn;
    recordToUpdate.checkOut = checkOut || recordToUpdate.checkOut;
    recordToUpdate.nama = nama || recordToUpdate.nama;

    await recordToUpdate.save();

    res.json({ message: "Data diperbarui.", data: recordToUpdate });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// ===================== DELETE =====================
exports.deletePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const record = await Presensi.findByPk(presensiId);

    if (!record) {
      return res.status(404).json({ message: "Data tidak ditemukan." });
    }

    await record.destroy();
    res.json({ message: "Data berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};
