import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaSearch, FaUser, FaPlus, FaTachometerAlt, FaShieldAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-200/50 border-b border-gray-100'
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">JD</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Just<span className="gradient-text">dial</span>
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="relative flex items-center">
                <FaSearch className="absolute left-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search businesses, categories, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {user ? (
              <>
                <Link
                  to="/add-business"
                  className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 font-medium"
                >
                  <FaPlus size={14} />
                  <span>Add Business</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 font-medium"
                >
                  <FaTachometerAlt size={14} />
                  <span>Dashboard</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 font-medium"
                  >
                    <FaShieldAlt size={14} />
                    <span>Admin</span>
                  </Link>
                )}
                <div className="w-px h-8 bg-gray-200 mx-2"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-gray-600 hover:text-primary-600 font-medium rounded-xl transition-all duration-300 hover:bg-primary-50"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden animate-slide-down">
            <div className="py-4 space-y-2">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
                  />
                </div>
              </form>

              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
              >
                <FaHome size={18} />
                <span className="font-medium">Home</span>
              </Link>

              {user ? (
                <>
                  <Link
                    to="/add-business"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
                  >
                    <FaPlus size={18} />
                    <span className="font-medium">Add Business</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
                  >
                    <FaTachometerAlt size={18} />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
                    >
                      <FaShieldAlt size={18} />
                      <span className="font-medium">Admin Panel</span>
                    </Link>
                  )}
                  <hr className="border-gray-200 my-2" />
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all w-full"
                  >
                    <FaSignOutAlt size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <hr className="border-gray-200 my-2" />
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 text-center text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl transition-all font-medium shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
