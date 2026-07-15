import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';

const BusinessCard = ({ business }) => {
  return (
    <div className="card group">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {business.image ? (
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            {business.category?.name?.charAt(0) || 'B'}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
            {business.category?.name || 'General'}
          </span>
          {business.featured && (
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{business.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span className="line-clamp-1">{business.address}, {business.city}</span>
        </div>
        {business.phone && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <FaPhone className="mr-2 text-green-500" />
            <span>{business.phone}</span>
          </div>
        )}
        <Link
          to={`/business/${business._id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details <FaArrowRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;
