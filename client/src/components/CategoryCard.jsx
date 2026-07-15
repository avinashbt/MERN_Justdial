import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/search?category=${category.slug}`}
      className="group relative bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-xl hover:shadow-primary-100/50 hover:-translate-y-1 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-purple-50/0 group-hover:from-primary-50/50 group-hover:to-purple-50/50 transition-all duration-500"></div>

      {/* Icon */}
      <div className="relative w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-primary-100 group-hover:to-primary-200 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <span className="text-3xl">{category.icon}</span>
      </div>

      {/* Content */}
      <h3 className="relative text-base font-semibold text-gray-800 group-hover:text-primary-600 transition-colors mb-1">
        {category.name}
      </h3>
      {category.description && (
        <p className="relative text-xs text-gray-500 line-clamp-2">{category.description}</p>
      )}

      {/* Arrow */}
      <div className="absolute bottom-4 right-4 w-8 h-8 bg-primary-50 group-hover:bg-primary-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
        <FaArrowRight size={12} className="text-primary-500 group-hover:text-white" />
      </div>
    </Link>
  );
};

export default CategoryCard;
