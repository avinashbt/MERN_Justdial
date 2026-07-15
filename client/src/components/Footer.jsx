import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">JD Clone</h3>
            <p className="text-sm">
              Find the best local businesses near you. Search from thousands of listings.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/search" className="hover:text-white">Search</Link></li>
              <li><Link to="/add-business" className="hover:text-white">Add Business</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/search?category=restaurants" className="hover:text-white">Restaurants</Link></li>
              <li><Link to="/search?category=hospitals" className="hover:text-white">Hospitals</Link></li>
              <li><Link to="/search?category=hotels" className="hover:text-white">Hotels</Link></li>
              <li><Link to="/search?category=schools" className="hover:text-white">Schools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@jdclone.com</li>
              <li>Phone: +1 234 567 890</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Justdial Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
