const express = require('express');
const router = express.Router();
const {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getMyBusinesses,
  getAllBusinessesAdmin,
} = require('../controllers/businessController');
const { protect, admin } = require('../middleware/auth');

router.get('/user/mine', protect, getMyBusinesses);
router.get('/admin/all', protect, admin, getAllBusinessesAdmin);
router.get('/', getBusinesses);
router.get('/:id', getBusiness);
router.post('/', protect, createBusiness);
router.put('/:id', protect, updateBusiness);
router.delete('/:id', protect, deleteBusiness);

module.exports = router;
