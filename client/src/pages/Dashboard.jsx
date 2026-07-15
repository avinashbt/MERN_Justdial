import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businessAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { FaEdit, FaTrash, FaEye, FaPlus, FaBuilding, FaList } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data } = await businessAPI.getMine();
      setBusinesses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this business?')) return;
    try {
      await businessAPI.delete(id);
      toast.success('Business deleted successfully');
      setBusinesses(businesses.filter((b) => b._id !== id));
    } catch (error) {
      toast.error('Failed to delete business');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">Welcome back, <span className="font-medium text-gray-700">{user?.name}</span></p>
          </div>
          <Link to="/add-business" className="btn-primary inline-flex items-center justify-center">
            <FaPlus className="mr-2" /> Add New Business
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card-static p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
                <FaBuilding className="text-primary-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{businesses.length}</p>
                <p className="text-gray-500 text-sm">Total Listings</p>
              </div>
            </div>
          </div>
          <div className="card-static p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <FaEye className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Active</p>
                <p className="text-gray-500 text-sm">All listings visible</p>
              </div>
            </div>
          </div>
          <div className="card-static p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <FaList className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Categories</p>
                <p className="text-gray-500 text-sm">Multiple available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        {businesses.length > 0 ? (
          <div className="card-static overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Your Listings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Business</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">City</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Created</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {businesses.map((biz) => (
                    <tr key={biz._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="font-bold text-primary-600">{biz.name.charAt(0)}</span>
                          </div>
                          <span className="font-medium text-gray-900">{biz.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="badge badge-primary">{biz.category?.name || '-'}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden lg:table-cell">{biz.city}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm hidden lg:table-cell">
                        {new Date(biz.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/business/${biz._id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View"
                          >
                            <FaEye size={16} />
                          </Link>
                          <Link
                            to={`/edit-business/${biz._id}`}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <FaEdit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(biz._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
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
        ) : (
          <div className="card-static p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBuilding className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No businesses yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first business listing</p>
            <Link to="/add-business" className="btn-primary inline-flex items-center">
              <FaPlus className="mr-2" /> Add Your First Business
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
