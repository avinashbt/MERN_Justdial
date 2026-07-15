const Business = require('../models/Business');
const Category = require('../models/Category');

// @desc    Get all businesses (with search/filter)
// @route   GET /api/businesses
const getBusinesses = async (req, res) => {
  try {
    const { search, category, city, page = 1, limit = 12 } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const total = await Business.countDocuments(query);
    const businesses = await Business.find(query)
      .populate('category', 'name slug')
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      businesses,
      total,
      pages: Math.ceil(total / limit),
      page: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single business
// @route   GET /api/businesses/:id
const getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('user', 'name email');

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a business
// @route   POST /api/businesses
const createBusiness = async (req, res) => {
  try {
    const { name, category, description, address, city, phone, email, website, image, openingHours } = req.body;

    if (!name || !category || !description || !address || !city || !phone) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const business = await Business.create({
      user: req.user._id,
      name,
      category,
      description,
      address,
      city,
      phone,
      email,
      website,
      image,
      openingHours,
    });

    const populated = await business.populate('category', 'name slug');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a business
// @route   PUT /api/businesses/:id
const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('category', 'name slug')
      .populate('user', 'name');

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a business
// @route   DELETE /api/businesses/:id
const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: 'Business removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's businesses
// @route   GET /api/businesses/user/mine
const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ user: req.user._id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all businesses (admin)
// @route   GET /api/businesses/admin/all
const getAllBusinessesAdmin = async (req, res) => {
  try {
    const businesses = await Business.find({})
      .populate('category', 'name slug')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getMyBusinesses,
  getAllBusinessesAdmin,
};
