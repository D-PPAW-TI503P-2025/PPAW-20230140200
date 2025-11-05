const { Presensi } = require("../models");
const { Op } = require("sequelize");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

exports.getDailyReport = async (req, res) => {
  try {
    const { tanggalMulai, tanggalSelesai } = req.query;

    if (!tanggalMulai || !tanggalSelesai) {
      return res.status(400).json({ message: "Tanggal mulai dan selesai wajib diisi." });
    }

    const isValidDate = (val) => !isNaN(Date.parse(val));
    if (!isValidDate(tanggalMulai) || !isValidDate(tanggalSelesai)) {
      return res.status(400).json({ message: "Format tanggal tidak valid." });
    }

    const data = await Presensi.findAll({
      where: {
        checkIn: {
          [Op.between]: [new Date(tanggalMulai), new Date(tanggalSelesai)]
        }
      },
      order: [["checkIn", "ASC"]]
    });

    const formatted = data.map((item) => ({
      id: item.id,
      userId: item.userId,
      nama: item.nama,
      checkIn: item.checkIn ? format(item.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }) : null,
      checkOut: item.checkOut ? format(item.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }) : null
    }));

    res.json({ message: "Laporan presensi", data: formatted });

  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};
