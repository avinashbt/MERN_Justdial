import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { businessAPI, categoryAPI } from '../services/api';
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Business</h1>
      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
            <input name="name" required className="input-field" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select name="category" required className="input-field" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea name="description" required rows={4} className="input-field" value={formData.description} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input name="address" required className="input-field" value={formData.address} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input name="city" required className="input-field" value={formData.city} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input name="phone" required className="input-field" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" className="input-field" value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input name="website" className="input-field" value={formData.website} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opening Hours</label>
              <input name="openingHours" className="input-field" value={formData.openingHours} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image" className="input-field" placeholder="https://..." value={formData.image} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-50">
            {loading ? 'Updating...' : 'Update Business'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBusiness;
