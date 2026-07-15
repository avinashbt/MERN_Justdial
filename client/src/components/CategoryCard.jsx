import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/search?category=${category.slug}`}
      className="card p-6 text-center hover:bg-primary-50 transition-colors group"
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
      )}
    </Link>
  );
};

export default CategoryCard;
