const express = require('express');
const router = express.Router();
const {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createRequest)
  .get(protect, admin, getAllRequests);

router.get('/my', protect, getMyRequests);

router.put('/:id/status', protect, admin, updateRequestStatus);

module.exports = router;
