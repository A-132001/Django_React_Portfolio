import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';

export default function BlogTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const response = await api.get('blog/tags/');
        setTags(response.data);
      } catch (error) {
        console.error('Error loading tags:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTags();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-3 border-b pb-2">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Link 
            key={tag.id}
            to={`/blog/tag/${tag.slug}`}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
          >
            #{tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
}