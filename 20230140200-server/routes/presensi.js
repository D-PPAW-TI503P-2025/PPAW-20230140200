const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');
const { addUserData } = require('../middleware/permissionMiddleware');

// GET routes tidak pakai addUserData
router.get('/', presensiController.getAllPresensi);
router.get('/:id', presensiController.getPresensiById);

// POST, PUT, DELETE pakai addUserData
router.post('/check-in', addUserData, presensiController.CheckIn);
router.post('/check-out', addUserData, presensiController.CheckOut);
router.put('/update/:id', addUserData, presensiController.updatePresensi);
router.delete('/delete/:id', addUserData, presensiController.deletePresensi);

// POST search by nama
router.post("/search", addUserData, presensiController.searchByName);

// POST search by tanggal
router.post("/search-date", addUserData, presensiController.searchByDate);


module.exports = router;
