import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowRight, FaStar, FaUsers, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { businessAPI, categoryAPI } from '../services/api';
import BusinessCard from '../components/BusinessCard';
import CategoryCard from '../components/CategoryCard';
import Spinner from '../components/Spinner';

const Home = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bizRes, catRes] = await Promise.all([
          businessAPI.getAll({ limit: 6 }),
          categoryAPI.getAll(),
        ]);
        setBusinesses(bizRes.data.businesses);
        setCategories(catRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <FaStar className="text-yellow-400" size={14} />
              <span className="text-sm font-medium">Trusted by 10,000+ businesses</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Best Local
              </span>
              <br />Businesses Near You
            </h1>

            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Discover top-rated restaurants, hospitals, hotels, and more.
              Search from thousands of businesses across multiple categories.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-50 group-hover:opacity-75 blur-lg transition-opacity"></div>
                <div className="relative flex items-center bg-white rounded-2xl p-2">
                  <FaSearch className="absolute left-6 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search businesses, categories, or cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 pl-14 pr-4 py-4 text-gray-800 text-lg focus:outline-none rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="text-primary-200 text-sm">Popular:</span>
              {['Restaurants', 'Hospitals', 'Hotels', 'Schools'].map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(`/search?category=${item.toLowerCase()}`)}
                  className="text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            {[
              { icon: FaBuilding, value: '5,000+', label: 'Businesses' },
              { icon: FaUsers, value: '50,000+', label: 'Happy Users' },
              { icon: FaStar, value: '4.8', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="text-yellow-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-primary-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-primary mb-4">Categories</span>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Find the best businesses across various categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <span className="badge badge-primary mb-4">Latest</span>
              <h2 className="section-title">Recent Listings</h2>
              <p className="section-subtitle">Recently added businesses</p>
            </div>
            <Link
              to="/search"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
            >
              View All
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-gray-400 text-3xl" />
              </div>
              <p className="text-gray-500 text-lg mb-4">No businesses listed yet.</p>
              <Link to="/add-business" className="btn-primary">
                Add First Business
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="badge badge-primary mb-4">Why Choose Us</span>
            <h2 className="section-title">Why List With Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy to Use',
                description: 'Add your business in minutes with our simple and intuitive interface.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                title: 'Wide Reach',
                description: 'Reach thousands of potential customers looking for services like yours.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                title: 'Free Listing',
                description: 'List your business for free and start getting customers today.',
                color: 'from-green-500 to-green-600',
              },
            ].map((feature, i) => (
              <div key={i} className="relative group">
                <div className="card-static p-8 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <FaCheckCircle className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Grow Your Business?
              </h2>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already listed on our platform.
                Start reaching more customers today.
              </p>
              <Link
                to="/add-business"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Add Your Business
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
