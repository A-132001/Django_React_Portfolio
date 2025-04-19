import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">Welcome, <span className="font-semibold">{user?.username}</span>!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Projects</h3>
            <p>Manage your portfolio projects</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Blog Posts</h3>
            <p>Manage your blog content</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Settings</h3>
            <p>Update your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}