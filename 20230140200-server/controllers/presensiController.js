const { Presensi } = require("../models");
const { Op } = require("sequelize");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";


exports.getAllPresensi = async (req, res) => {
  try {
    const data = await Presensi.findAll();
    res.json({ message: "List presensi", data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};


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


exports.checkIn = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const existingRecord = await Presensi.findOne({
      where: { userId, checkOut: null },
    });

    if (existingRecord) {
      return res.status(400).json({ message: "Anda sudah check-in hari ini." });
    }

    const newRecord = await Presensi.create({
      userId,
      nama: userName,
      checkIn: waktuSekarang,
    });

    res.status(201).json({
      message: `Check-in berhasil pukul ${format(waktuSekarang, "HH:mm:ss", { timeZone })} WIB`,
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};


exports.checkOut = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    const recordToUpdate = await Presensi.findOne({
      where: { userId, checkOut: null },
    });

    if (!recordToUpdate) {
      return res.status(404).json({ message: "Belum ada check-in aktif." });
    }

    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();

    res.json({
      message: `Check-out berhasil pukul ${format(waktuSekarang, "HH:mm:ss", { timeZone })} WIB`,
      data: recordToUpdate,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};


exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const { checkIn, checkOut, nama } = req.body;

    const isValidDate = (val) => !isNaN(Date.parse(val));
    if (checkIn !== undefined && !isValidDate(checkIn)) {
      return res.status(400).json({ message: "Format tanggal checkIn tidak valid" });
    }
    if (checkOut !== undefined && !isValidDate(checkOut)) {
      return res.status(400).json({ message: "Format tanggal checkOut tidak valid" });
    }

    const recordToUpdate = await Presensi.findByPk(presensiId);
    if (!recordToUpdate) return res.status(404).json({ message: "Data tidak ditemukan" });

    if (checkIn !== undefined) recordToUpdate.checkIn = checkIn;
    if (checkOut !== undefined) recordToUpdate.checkOut = checkOut;
    if (nama !== undefined) recordToUpdate.nama = nama;

    await recordToUpdate.save();
    res.json({ message: "Data presensi diperbarui", data: recordToUpdate });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};


exports.deletePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    const record = await Presensi.findByPk(presensiId);

    if (!record) return res.status(404).json({ message: "Data tidak ditemukan" });

    await record.destroy();
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};


exports.searchByName = async (req, res) => {
  try {
    const { nama } = req.body;
    if (!nama) return res.status(400).json({ message: "Nama wajib diisi" });

    const data = await Presensi.findAll({
      where: { nama: { [Op.like]: `%${nama}%` } },
    });

    res.json({ message: "Hasil pencarian nama", data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};


exports.searchByDate = async (req, res) => {
  try {
    const { tanggalMulai, tanggalSelesai } = req.body;

    if (!tanggalMulai || !tanggalSelesai) {
      return res.status(400).json({ message: "Tanggal mulai & selesai wajib diisi" });
    }

    const isValidDate = (val) => !isNaN(Date.parse(val));
    if (!isValidDate(tanggalMulai) || !isValidDate(tanggalSelesai)) {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    const data = await Presensi.findAll({
      where: {
        checkIn: {
          [Op.between]: [new Date(tanggalMulai), new Date(tanggalSelesai)]
        }
      },
      order: [["checkIn", "ASC"]]
    });

    res.json({ message: "Hasil pencarian tanggal", data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};
