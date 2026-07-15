const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const User = require('./models/User');
const Business = require('./models/Business');

dotenv.config();

const demoBusinesses = [
  {
    name: 'Spice Garden Restaurant',
    description: 'Authentic Indian cuisine with a modern twist. We serve traditional dishes made with fresh ingredients and secret family recipes. Perfect for family dinners and celebrations.',
    address: '12 MG Road',
    city: 'Mumbai',
    phone: '+91 98765 43210',
    email: 'contact@spicegarden.com',
    website: 'https://spicegarden.com',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    openingHours: 'Mon-Sun: 11AM - 11PM',
    categoryName: 'Restaurants',
  },
  {
    name: 'Pizza Paradise',
    description: 'Wood-fired pizzas and Italian delicacies. Our chefs bring you the authentic taste of Italy with the freshest toppings and hand-tossed dough.',
    address: '45 Linking Road',
    city: 'Mumbai',
    phone: '+91 98765 43211',
    email: 'info@pizzaparadise.com',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    openingHours: 'Mon-Sun: 10AM - 12AM',
    categoryName: 'Restaurants',
  },
  {
    name: 'Burger Barn',
    description: 'Gourmet burgers and shakes that will blow your mind. We use only the freshest beef patties and homemade sauces for the ultimate burger experience.',
    address: '78 Hill Road',
    city: 'Mumbai',
    phone: '+91 98765 43212',
    email: 'hello@burgerbarn.com',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
    openingHours: 'Mon-Sun: 11AM - 11PM',
    categoryName: 'Restaurants',
  },
  {
    name: 'Apollo Hospital',
    description: 'Multi-specialty hospital with world-class doctors and state-of-the-art equipment. 24/7 emergency services and comprehensive healthcare solutions.',
    address: '100 Medical Center Drive',
    city: 'Delhi',
    phone: '+91 98765 43213',
    email: 'info@apollohospital.com',
    website: 'https://apollohospital.com',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
    openingHours: '24/7 Emergency Services',
    categoryName: 'Hospitals',
  },
  {
    name: 'City Care Clinic',
    description: 'Affordable healthcare services with experienced doctors. General checkups, specialist consultations, and diagnostic services all under one roof.',
    address: '25 Health Avenue',
    city: 'Delhi',
    phone: '+91 98765 43214',
    email: 'care@citycare.com',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800',
    openingHours: 'Mon-Sat: 8AM - 9PM',
    categoryName: 'Hospitals',
  },
  {
    name: 'The Grand Palace Hotel',
    description: 'Luxury hotel offering premium rooms, rooftop restaurant, spa, and swimming pool. Experience royalty in the heart of the city.',
    address: '5 Star Boulevard',
    city: 'Jaipur',
    phone: '+91 98765 43215',
    email: 'reservations@grandpalace.com',
    website: 'https://grandpalacehotel.com',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    openingHours: '24/7',
    categoryName: 'Hotels',
  },
  {
    name: 'Budget Stay Inn',
    description: 'Comfortable and affordable accommodation for travelers. Clean rooms, friendly staff, and convenient location near major attractions.',
    address: '30 Tourist Lane',
    city: 'Goa',
    phone: '+91 98765 43216',
    email: 'info@budgetstay.com',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    openingHours: '24/7',
    categoryName: 'Hotels',
  },
  {
    name: 'Delhi Public School',
    description: 'Premier educational institution with modern facilities, experienced faculty, and holistic development approach. Admissions open for all grades.',
    address: '15 Education Block',
    city: 'Delhi',
    phone: '+91 98765 43217',
    email: 'info@dps.edu',
    website: 'https://dps.edu',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
    openingHours: 'Mon-Sat: 7:30AM - 2:30PM',
    categoryName: 'Schools',
  },
  {
    name: 'Sunshine Academy',
    description: 'Nurturing young minds with innovative teaching methods. Small class sizes, personalized attention, and excellent board results year after year.',
    address: '8 Learning Park',
    city: 'Pune',
    phone: '+91 98765 43218',
    email: 'admissions@sunshine.edu',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    openingHours: 'Mon-Sat: 8AM - 3PM',
    categoryName: 'Schools',
  },
  {
    name: 'Dream Homes Realty',
    description: 'Your trusted partner in finding the perfect property. We specialize in residential, commercial, and investment properties across the city.',
    address: '20 Property Plaza',
    city: 'Bangalore',
    phone: '+91 98765 43219',
    email: 'info@dreamhomes.com',
    website: 'https://dreamhomes.com',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    openingHours: 'Mon-Sat: 9AM - 7PM',
    categoryName: 'Real Estate',
  },
  {
    name: 'Urban Nest Interiors',
    description: 'Transform your space with our award-winning interior design services. From concept to completion, we bring your vision to life.',
    address: '35 Design Street',
    city: 'Mumbai',
    phone: '+91 98765 43220',
    email: 'design@urbannest.com',
    website: 'https://urbannest.com',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    openingHours: 'Mon-Fri: 10AM - 7PM',
    categoryName: 'Interior Designers',
  },
  {
    name: 'Spark Electric Services',
    description: 'Professional electrical services for homes and businesses. Licensed electricians, quick response, and 24/7 emergency support.',
    address: '50 Power Line',
    city: 'Chennai',
    phone: '+91 98765 43221',
    email: 'service@sparkelectric.com',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
    openingHours: 'Mon-Sun: 8AM - 8PM',
    categoryName: 'Electricians',
  },
  {
    name: 'AquaFix Plumbers',
    description: 'Expert plumbing solutions for all your needs. From leaky taps to complete bathroom renovations, we do it all with guaranteed satisfaction.',
    address: '12 Water Way',
    city: 'Hyderabad',
    phone: '+91 98765 43222',
    email: 'help@aquafix.com',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
    openingHours: 'Mon-Sun: 7AM - 9PM',
    categoryName: 'Plumbers',
  },
  {
    name: 'Glamour Beauty Salon',
    description: 'Premium beauty and grooming services for men and women. Hair styling, facials, manicures, and spa treatments by expert stylists.',
    address: '28 Fashion Avenue',
    city: 'Mumbai',
    phone: '+91 98765 43223',
    email: 'book@glamour.com',
    website: 'https://glamoursalon.com',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
    openingHours: 'Mon-Sun: 10AM - 9PM',
    categoryName: 'Salons',
  },
  {
    name: 'FitZone Gym',
    description: 'State-of-the-art fitness center with modern equipment, personal trainers, and group classes. Transform your body and mind with us.',
    address: '42 Fitness Lane',
    city: 'Bangalore',
    phone: '+91 98765 43224',
    email: 'join@fitzone.com',
    website: 'https://fitzone.com',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    openingHours: 'Mon-Sun: 5AM - 11PM',
    categoryName: 'Gyms',
  },
  {
    name: 'Tandoori Nights',
    description: 'Experience the magic of tandoori cooking. Our clay oven dishes are legendary, and our kebabs melt in your mouth. A food lover\'s paradise.',
    address: '67 Spice Market',
    city: 'Delhi',
    phone: '+91 98765 43225',
    email: 'reservations@tandoorinights.com',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800',
    openingHours: 'Mon-Sun: 6PM - 12AM',
    categoryName: 'Restaurants',
  },
  {
    name: 'Wellness Hub Hospital',
    description: 'Holistic healthcare approach combining modern medicine with wellness therapies. Our experienced team ensures comprehensive care for every patient.',
    address: '88 Wellness Road',
    city: 'Kolkata',
    phone: '+91 98765 43226',
    email: 'info@wellnesshub.com',
    image: 'https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=800',
    openingHours: '24/7',
    categoryName: 'Hospitals',
  },
  {
    name: 'Royal Heritage Hotel',
    description: 'Heritage property converted into a luxury hotel. Experience the charm of old-world architecture with modern amenities and royal hospitality.',
    address: '5 Heritage Lane',
    city: 'Jaipur',
    phone: '+91 98765 43227',
    email: 'stay@royalheritage.com',
    website: 'https://royalheritagehotel.com',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
    openingHours: '24/7',
    categoryName: 'Hotels',
  },
  {
    name: 'Little Stars Preschool',
    description: 'Where learning meets fun! Our play-based curriculum helps children develop socially, emotionally, and academically in a safe environment.',
    address: '18 Children\'s Corner',
    city: 'Pune',
    phone: '+91 98765 43228',
    email: 'enroll@littlestars.edu',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800',
    openingHours: 'Mon-Fri: 9AM - 3PM',
    categoryName: 'Schools',
  },
  {
    name: 'Prime Properties',
    description: 'Commercial real estate experts. Office spaces, retail outlets, and industrial plots at prime locations. Investment consulting available.',
    address: '55 Business District',
    city: 'Bangalore',
    phone: '+91 98765 43229',
    email: 'deals@primeproperties.com',
    website: 'https://primeproperties.com',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    openingHours: 'Mon-Sat: 9AM - 6PM',
    categoryName: 'Real Estate',
  },
  {
    name: 'Creative Spaces Studio',
    description: 'Award-winning interior design studio specializing in residential and commercial spaces. We create environments that inspire and delight.',
    address: '7 Art District',
    city: 'Mumbai',
    phone: '+91 98765 43230',
    email: 'studio@creativespaces.com',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    openingHours: 'Mon-Fri: 10AM - 6PM',
    categoryName: 'Interior Designers',
  },
  {
    name: 'PowerGrid Electric',
    description: 'Industrial and residential electrical solutions. Solar panel installation, wiring, and maintenance services by certified professionals.',
    address: '99 Current Street',
    city: 'Chennai',
    phone: '+91 98765 43231',
    email: 'info@powergrid.com',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
    openingHours: 'Mon-Sat: 8AM - 7PM',
    categoryName: 'Electricians',
  },
  {
    name: 'PipeMaster Solutions',
    description: 'Complete plumbing services for residential and commercial properties. Emergency repairs, installations, and maintenance by licensed plumbers.',
    address: '33 Flow Road',
    city: 'Hyderabad',
    phone: '+91 98765 43232',
    email: 'service@pipemaster.com',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    openingHours: 'Mon-Sun: 7AM - 8PM',
    categoryName: 'Plumbers',
  },
  {
    name: 'Style Studio Salon',
    description: 'Unisex salon offering premium hair and beauty services. Our expert stylists use international products for the best results.',
    address: '14 Style Street',
    city: 'Delhi',
    phone: '+91 98765 43233',
    email: 'appoint@stylestudio.com',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
    openingHours: 'Mon-Sun: 10AM - 9PM',
    categoryName: 'Salons',
  },
  {
    name: 'Iron Core Fitness',
    description: 'Premium gym with crossfit, yoga, and weight training facilities. Personalized diet plans and training programs for all fitness levels.',
    address: '27 Muscle Lane',
    city: 'Mumbai',
    phone: '+91 98765 43234',
    email: 'train@ironcore.com',
    website: 'https://ironcorefitness.com',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
    openingHours: 'Mon-Sun: 5AM - 11PM',
    categoryName: 'Gyms',
  },
];

const seedBusinesses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    let adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      });
    }

    await Business.deleteMany({});
    console.log('Cleared existing businesses');

    let created = 0;
    for (const biz of demoBusinesses) {
      const categoryId = categoryMap[biz.categoryName];
      if (!categoryId) {
        console.log(`Category not found: ${biz.categoryName}`);
        continue;
      }

      await Business.create({
        user: adminUser._id,
        name: biz.name,
        category: categoryId,
        description: biz.description,
        address: biz.address,
        city: biz.city,
        phone: biz.phone,
        email: biz.email,
        website: biz.website || '',
        image: biz.image,
        openingHours: biz.openingHours,
        featured: created < 3,
      });
      created++;
      console.log(`Created: ${biz.name}`);
    }

    console.log(`\n${created} demo businesses created!`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedBusinesses();
