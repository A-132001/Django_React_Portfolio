import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProjectList from './components/ProjectList';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import BlogAdmin from './components/blog/BlogAdmin';
import PostForm from './components/blog/PostForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProjectList />} />

              {/* Protected Admin Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/projects/manage" element={<ProjectList adminMode />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/blog/new" element={<PostForm />} />
                <Route path="/admin/blog/edit/:id" element={<PostForm />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;