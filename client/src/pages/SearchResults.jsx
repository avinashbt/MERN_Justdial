import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { businessAPI, categoryAPI } from '../services/api';
import BusinessCard from '../components/BusinessCard';
import Spinner from '../components/Spinner';
import { FaSearch, FaFilter, FaTimes, FaBuilding } from 'react-icons/fa';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
  });

  useEffect(() => {
    categoryAPI.getAll().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setLoading(true);
      try {
        const params = {};
        if (filters.search) params.search = filters.search;
        if (filters.category) params.category = filters.category;
        if (filters.city) params.city = filters.city;
        params.page = searchParams.get('page') || 1;

        const { data } = await businessAPI.getAll(params);
        setBusinesses(data.businesses);
        setPagination({ pages: data.pages, page: data.page, total: data.total });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, [filters, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.city) params.set('city', filters.city);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', city: '' });
    setSearchParams({});
  };

  const hasActiveFilters = filters.search || filters.category || filters.city;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Businesses</h1>
          <p className="text-gray-500">
            {pagination.total ? `Found ${pagination.total} results` : 'Find the best local businesses'}
          </p>
        </div>

        {/* Filters */}
        <div className="card-static p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by business name..."
                  className="input-field pl-12"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <select
                className="input-field"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Filter by city..."
                className="input-field"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="submit" className="btn-primary">
                  <FaSearch className="inline mr-2" /> Search
                </button>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <FaTimes size={14} /> Clear All
                  </button>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {pagination.total || 0} results found
              </span>
            </div>
          </form>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {filters.search && (
                <span className="badge badge-primary flex items-center gap-1">
                  Name: {filters.search}
                  <button onClick={() => setFilters({ ...filters, search: '' })}>
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="badge badge-primary flex items-center gap-1">
                  Category: {filters.category}
                  <button onClick={() => setFilters({ ...filters, category: '' })}>
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
              {filters.city && (
                <span className="badge badge-primary flex items-center gap-1">
                  City: {filters.city}
                  <button onClick={() => setFilters({ ...filters, city: '' })}>
                    <FaTimes size={10} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <Spinner />
        ) : businesses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business._id} business={business} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set('page', p);
                      setSearchParams(params);
                    }}
                    className={`w-10 h-10 rounded-xl font-medium transition-all ${
                      p === pagination.page
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 card-static">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBuilding className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No businesses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
