import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

export default function BlogCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get('blog/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="font-bold text-lg mb-3 border-b pb-2">Categories</h3>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.id}>
            <Link 
              to={`/blog/category/${category.slug}`}
              className="flex items-center justify-between hover:text-blue-600"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                {category.blogpost_set?.length || 0}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}