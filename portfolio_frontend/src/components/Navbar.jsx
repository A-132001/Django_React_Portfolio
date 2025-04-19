import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          My Portfolio
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Projects</Link>
          <Link to="/admin/blog" className="hover:text-gray-300">Blog</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          
          {user ? (
            <>
              <Link to="/admin" className="hover:text-gray-300">Admin</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link 
                to="/register" 
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}