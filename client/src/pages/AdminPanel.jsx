import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI, businessAPI, categoryAPI } from '../services/api';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { FaUsers, FaBriefcase, FaTags, FaTrash, FaEye, FaPlus, FaSearch, FaChartBar } from 'react-icons/fa';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bizRes, userRes, catRes] = await Promise.all([
        businessAPI.getAllAdmin(),
        authAPI.getUsers(),
        categoryAPI.getAll(),
      ]);
      setBusinesses(bizRes.data);
      setUsers(userRes.data);
      setCategories(catRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    try {
      await authAPI.deleteUser(id);
      toast.success('User deleted');
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleDeleteBusiness = async (id) => {
    if (!window.confirm('Delete this business?')) return;
    try {
      await businessAPI.delete(id);
      toast.success('Business deleted');
      setBusinesses(businesses.filter((b) => b._id !== id));
    } catch (error) {
      toast.error('Failed to delete business');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      const { data } = await categoryAPI.create({ name: newCategory.trim() });
      setCategories([...categories, data]);
      setNewCategory('');
      toast.success('Category added');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await categoryAPI.delete(id);
      toast.success('Category deleted');
      setCategories(categories.filter((c) => c._id !== id));
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const tabs = [
    { id: 'businesses', label: 'Businesses', icon: FaBriefcase, count: businesses.length },
    { id: 'users', label: 'Users', icon: FaUsers, count: users.length },
    { id: 'categories', label: 'Categories', icon: FaTags, count: categories.length },
  ];

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-500">Manage your platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Businesses', value: businesses.length, icon: FaBriefcase, color: 'from-blue-500 to-blue-600' },
            { label: 'Total Users', value: users.length, icon: FaUsers, color: 'from-green-500 to-green-600' },
            { label: 'Categories', value: categories.length, icon: FaTags, color: 'from-purple-500 to-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="card-static p-6 group hover:shadow-lg transition-all">
              <div className="flex items-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl border border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Businesses Tab */}
        {activeTab === 'businesses' && (
          <div className="card-static overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Business</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Owner</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">City</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {businesses
                    .filter((biz) => biz.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((biz) => (
                    <tr key={biz._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="font-bold text-primary-600">{biz.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{biz.name}</p>
                            <p className="text-xs text-gray-500">{biz.category?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{biz.user?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">{biz.city}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm hidden lg:table-cell">
                        {new Date(biz.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/business/${biz._id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <FaEye size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteBusiness(biz._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card-static overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Joined</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="font-semibold text-gray-600">{u.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <span className="font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`badge ${u.role === 'admin' ? 'badge-red' : 'badge-gray'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm hidden lg:table-cell">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="card-static p-6 mb-6">
              <form onSubmit={handleAddCategory} className="flex gap-4">
                <input
                  type="text"
                  placeholder="New category name..."
                  className="input-field flex-1"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="submit" className="btn-primary flex items-center">
                  <FaPlus className="mr-2" /> Add
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat._id} className="card-static p-4 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{cat.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <p className="text-xs text-gray-500">{cat.slug}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
