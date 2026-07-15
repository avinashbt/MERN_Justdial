import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { businessAPI } from '../services/api';
import { FaMapMarkerAlt, FaPhone, FaGlobe, FaEnvelope, FaClock, FaArrowLeft, FaShare, FaHeart, FaStar, FaDirections } from 'react-icons/fa';
import Spinner from '../components/Spinner';

const BusinessDetails = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBuilding className="text-gray-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Business Not Found</h2>
          <p className="text-gray-500 mb-6">The business you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
          {business.image && !imageError ? (
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-primary-600">
                    {business.name.charAt(0)}
                  </span>
                </div>
                <span className="text-primary-700 font-medium">{business.category?.name}</span>
              </div>
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            >
              <FaHeart className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'} />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
              <FaShare className="text-gray-600" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="badge badge-primary backdrop-blur-sm text-sm">
              {business.category?.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-static p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                  <div className="flex items-center text-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <span>{business.address}, {business.city}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? 'fill-current' : 'fill-gray-200 text-gray-200'} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(4.0) · 120 reviews</span>
              </div>

              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{business.description}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="card-static p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FaMapMarkerAlt className="text-3xl mb-2 mx-auto" />
                  <p>{business.address}, {business.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="card-static p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-500 transition-colors">
                    <FaPhone className="text-green-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{business.phone}</p>
                  </div>
                </a>

                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-500 transition-colors">
                      <FaEnvelope className="text-blue-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{business.email}</p>
                    </div>
                  </a>
                )}

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500 transition-colors">
                      <FaGlobe className="text-purple-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Website</p>
                      <p className="font-medium text-primary-600 truncate max-w-[180px]">{business.website}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Hours Card */}
            {business.openingHours && (
              <div className="card-static p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h3>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <FaClock className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hours</p>
                    <p className="font-medium text-gray-900">{business.openingHours}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={`https://maps.google.com/?q=${business.address},${business.city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 btn-primary"
              >
                <FaDirections className="mr-2" /> Get Directions
              </a>
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all"
              >
                <FaPhone className="mr-2" /> Call Now
              </a>
            </div>

            {/* Listed By */}
            <div className="card-static p-4">
              <p className="text-sm text-gray-500 text-center">
                Listed by <span className="font-medium text-gray-700">{business.user?.name || 'Unknown'}</span>
                <br />
                <span className="text-xs">{new Date(business.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
