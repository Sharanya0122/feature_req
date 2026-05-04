const FeatureRequest = require('../models/FeatureRequest');

// @desc    Create a new feature request
// @route   POST /api/requests
// @access  Private (USER)
const createRequest = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Duplicate title validation
    const requestExists = await FeatureRequest.findOne({ title });
    if (requestExists) {
      return res.status(400).json({ message: 'A feature request with this title already exists' });
    }

    const featureRequest = await FeatureRequest.create({
      title,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json(featureRequest);
  } catch (error) {
    // Handle Mongoose duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A feature request with this title already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's feature requests
// @route   GET /api/requests/my
// @access  Private (USER)
const getMyRequests = async (req, res) => {
  try {
    const requests = await FeatureRequest.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all feature requests
// @route   GET /api/requests
// @access  Private/Admin
const getAllRequests = async (req, res) => {
  try {
    const requests = await FeatureRequest.find({})
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update feature request status
// @route   PUT /api/requests/:id/status
// @access  Private/Admin
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const request = await FeatureRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Feature request not found' });
    }

    request.status = status;
    const updatedRequest = await request.save();

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
};
