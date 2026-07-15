import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaArrowRight, FaHeart, FaStar } from 'react-icons/fa';
import { useState } from 'react';

const BusinessCard = ({ business }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card group relative">
      {/* Image Section */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {business.image && !imageError ? (
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-primary-600">
                  {business.category?.name?.charAt(0) || 'B'}
                </span>
              </div>
              <span className="text-xs text-gray-400">{business.category?.name || 'Business'}</span>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-primary backdrop-blur-sm">
            {business.category?.name || 'General'}
          </span>
          {business.featured && (
            <span className="badge badge-yellow backdrop-blur-sm flex items-center gap-1">
              <FaStar size={10} /> Featured
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        >
          <FaHeart
            size={16}
            className={`transition-colors duration-300 ${
              isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {business.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <FaMapMarkerAlt className="text-red-500 text-xs" />
            </div>
            <span className="line-clamp-1">{business.address}, {business.city}</span>
          </div>
          {business.phone && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <FaPhone className="text-green-500 text-xs" />
              </div>
              <span>{business.phone}</span>
            </div>
          )}
        </div>

        <Link
          to={`/business/${business._id}`}
          className="flex items-center justify-center w-full py-2.5 bg-gray-50 hover:bg-primary-50 text-primary-600 font-semibold rounded-xl transition-all duration-300 group/link"
        >
          View Details
          <FaArrowRight className="ml-2 text-xs group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;
