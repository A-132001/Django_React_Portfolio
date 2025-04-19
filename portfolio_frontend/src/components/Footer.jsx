import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">My Portfolio</h3>
            <p className="text-gray-400">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div className="flex space-x-4">
            {user && (
              <span className="text-gray-300">Welcome, {user.username}</span>
            )}
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
            <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}