import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businessAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';

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
      toast.success('Business deleted');
      setBusinesses(businesses.filter((b) => b._id !== id));
    } catch (error) {
      toast.error('Failed to delete business');
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Link to="/add-business" className="btn-primary inline-flex items-center">
          <FaPlus className="mr-2" /> Add Business
        </Link>
      </div>

      {businesses.length > 0 ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {businesses.map((biz) => (
                  <tr key={biz._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">{biz.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{biz.category?.name || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{biz.city}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(biz.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link to={`/business/${biz._id}`} className="text-blue-600 hover:text-blue-700">
                          <FaEye />
                        </Link>
                        <Link to={`/edit-business/${biz._id}`} className="text-yellow-600 hover:text-yellow-700">
                          <FaEdit />
                        </Link>
                        <button onClick={() => handleDelete(biz._id)} className="text-red-600 hover:text-red-700">
                          <FaTrash />
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
        <div className="text-center py-16 card">
          <p className="text-gray-500 text-lg mb-4">You haven't added any businesses yet.</p>
          <Link to="/add-business" className="btn-primary">
            Add Your First Business
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
