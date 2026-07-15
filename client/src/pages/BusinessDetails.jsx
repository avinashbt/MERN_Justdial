import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { businessAPI } from '../services/api';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaEnvelope, FaClock, FaArrowLeft } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const { data } = await businessAPI.getOne(id);
        setBusiness(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [id]);

  if (loading) return <Spinner />;
  if (!business) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Business not found.</p>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>

      <div className="card overflow-hidden">
        {business.image && (
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {business.category?.name}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-3">{business.name}</h1>
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-6 whitespace-pre-line">{business.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="text-red-500 mr-3 text-xl" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">{business.address}, {business.city}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FaPhone className="text-green-500 mr-3 text-xl" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">{business.phone}</p>
              </div>
            </div>
            {business.email && (
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="text-blue-500 mr-3 text-xl" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{business.email}</p>
                </div>
              </div>
            )}
            {business.website && (
              <div className="flex items-center text-gray-700">
                <FaGlobe className="text-purple-500 mr-3 text-xl" />
                <div>
                  <p className="font-medium">Website</p>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {business.website}
                  </a>
                </div>
              </div>
            )}
            {business.openingHours && (
              <div className="flex items-center text-gray-700">
                <FaClock className="text-yellow-500 mr-3 text-xl" />
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-gray-600">{business.openingHours}</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4 text-sm text-gray-500">
            Listed by {business.user?.name || 'Unknown'} •{' '}
            {new Date(business.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
