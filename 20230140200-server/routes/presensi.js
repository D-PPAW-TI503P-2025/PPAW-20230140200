const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');

const { addUserData, authenticateToken, isAdmin } = require('../middleware/permissionMiddleware');

console.log("checkIn:", presensiController.checkIn);
console.log("checkOut:", presensiController.checkOut);
console.log("addUserData:", addUserData);



router.get('/', presensiController.getAllPresensi);
router.get('/:id', presensiController.getPresensiById);


router.post('/check-in', addUserData, presensiController.checkIn);
router.post('/check-out', addUserData, presensiController.checkOut);
router.put('/update/:id', addUserData, presensiController.updatePresensi);
router.delete('/delete/:id', addUserData, presensiController.deletePresensi);


router.post('/search', addUserData, presensiController.searchByName);
router.post('/search-date', addUserData, presensiController.searchByDate);

module.exports = router;
