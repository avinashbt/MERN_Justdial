const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a business name'],
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    email: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    openingHours: {
      type: String,
      default: 'Mon-Sat: 9AM - 9PM',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

businessSchema.index({ name: 'text', city: 'text' });

module.exports = mongoose.model('Business', businessSchema);
