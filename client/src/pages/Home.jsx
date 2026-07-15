import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Local Businesses Near You
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Search from thousands of businesses across multiple categories
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search businesses, categories, or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-300 text-lg"
              />
              <FaSearch className="absolute left-4 top-4.5 text-gray-400 text-xl" />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Categories</h2>
            <p className="text-gray-600">Browse businesses by category</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Listings</h2>
              <p className="text-gray-600">Recently added businesses</p>
            </div>
            <Link to="/search" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </Link>
          </div>
          {businesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No businesses listed yet.</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            List Your Business With Us
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Reach thousands of potential customers. Add your business listing today.
          </p>
          <Link to="/add-business" className="btn-primary text-lg px-8 py-3">
            Add Your Business
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
