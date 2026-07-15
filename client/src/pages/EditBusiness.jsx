import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { businessAPI, categoryAPI } from '../services/api';
import { FaArrowLeft, FaBuilding, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const EditBusiness = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    website: '',
    image: '',
    openingHours: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bizRes, catRes] = await Promise.all([
          businessAPI.getOne(id),
          categoryAPI.getAll(),
        ]);
        const biz = bizRes.data;
        setFormData({
          name: biz.name,
          category: biz.category?._id || '',
          description: biz.description,
          address: biz.address,
          city: biz.city,
          phone: biz.phone,
          email: biz.email || '',
          website: biz.website || '',
          image: biz.image || '',
          openingHours: biz.openingHours || '',
        });
        setCategories(catRes.data);
      } catch (error) {
        toast.error('Failed to load business');
        navigate('/dashboard');
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await businessAPI.update(id, formData);
      toast.success('Business updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update business');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (pageLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Business</h1>
          <p className="text-gray-500">Update your business information</p>
        </div>

        <div className="card-static p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaBuilding className="mr-2 text-primary-600" /> Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name *</label>
                  <input name="name" required className="input-field" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select name="category" required className="input-field" value={formData.category} onChange={handleChange}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea name="description" required rows={4} className="input-field resize-none" value={formData.description} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                  <input name="address" required className="input-field" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input name="city" required className="input-field" value={formData.city} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input name="phone" required className="input-field" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input name="email" type="email" className="input-field" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <input name="website" className="input-field" value={formData.website} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Opening Hours</label>
                  <input name="openingHours" className="input-field" value={formData.openingHours} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Image URL</label>
              <input name="image" className="input-field" placeholder="https://example.com/image.jpg" value={formData.image} onChange={handleChange} />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 text-base disabled:opacity-50 flex items-center justify-center">
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                <><FaSave className="mr-2" /> Update Business</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBusiness;
