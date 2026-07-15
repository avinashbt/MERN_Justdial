import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { businessAPI, categoryAPI } from '../services/api';
import BusinessCard from '../components/BusinessCard';
import Spinner from '../components/Spinner';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Businesses</h1>

      {/* Filters */}
      <div className="card p-6 mb-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Business name..."
            className="input-field"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            className="input-field"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="City..."
            className="input-field"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1">
              Search
            </button>
            <button type="button" onClick={clearFilters} className="btn-secondary">
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <Spinner />
      ) : businesses.length > 0 ? (
        <>
          <p className="text-gray-600 mb-4">{pagination.total} results found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('page', p);
                    setSearchParams(params);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    p === pagination.page
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No businesses found matching your criteria.</p>
          <button onClick={clearFilters} className="mt-4 text-primary-600 hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
