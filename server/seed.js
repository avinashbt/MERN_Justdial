const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const User = require('./models/User');

dotenv.config();

const categories = [
  { name: 'Restaurants', icon: '🍽️', description: 'Food and dining establishments' },
  { name: 'Hospitals', icon: '🏥', description: 'Healthcare facilities' },
  { name: 'Hotels', icon: '🏨', description: 'Accommodation and lodging' },
  { name: 'Schools', icon: '🏫', description: 'Educational institutions' },
  { name: 'Real Estate', icon: '🏠', description: 'Property and real estate services' },
  { name: 'Interior Designers', icon: '🎨', description: 'Interior design and decoration' },
  { name: 'Electricians', icon: '⚡', description: 'Electrical repair and installation' },
  { name: 'Plumbers', icon: '🔧', description: 'Plumbing services' },
  { name: 'Salons', icon: '💇', description: 'Beauty and hair salons' },
  { name: 'Gyms', icon: '💪', description: 'Fitness centers and gyms' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('Categories seeded');

    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created (admin@example.com / admin123)');
    }

    console.log('Seed completed!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
