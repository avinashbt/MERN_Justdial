import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authAPI, businessAPI, categoryAPI } from '../services/api';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { FaUsers, FaBriefcase, FaTags, FaTrash, FaEye } from 'react-icons/fa';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('businesses');
  const [businesses, setBusinesses] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');

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
    if (!window.confirm('Delete this user?')) return;
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

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaBriefcase className="text-blue-600 text-xl" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{businesses.length}</p>
            <p className="text-gray-600">Businesses</p>
          </div>
        </div>
        <div className="card p-6 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <FaUsers className="text-green-600 text-xl" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            <p className="text-gray-600">Users</p>
          </div>
        </div>
        <div className="card p-6 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <FaTags className="text-purple-600 text-xl" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {['businesses', 'users', 'categories'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-medium capitalize ${
              activeTab === tab
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Businesses Tab */}
      {activeTab === 'businesses' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {businesses.map((biz) => (
                  <tr key={biz._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{biz.name}</td>
                    <td className="px-6 py-4 text-gray-600">{biz.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-600">{biz.city}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`/business/${biz._id}`} className="text-blue-600 hover:text-blue-700"><FaEye /></Link>
                      <button onClick={() => handleDeleteBusiness(biz._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
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
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDeleteUser(u._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
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
          <form onSubmit={handleAddCategory} className="card p-4 mb-6 flex gap-4">
            <input
              type="text"
              placeholder="New category name..."
              className="input-field flex-1"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Add Category
            </button>
          </form>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{cat.icon} {cat.name}</td>
                      <td className="px-6 py-4 text-gray-600">{cat.slug}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-600 hover:text-red-700"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
