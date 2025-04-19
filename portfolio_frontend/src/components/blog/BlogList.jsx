import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api';
import BlogPostCard from './BlogPostCard';
import BlogCategories from './BlogCategories';
import BlogTags from './BlogTags';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category, tag } = useParams();

  useEffect(() => {
    const loadPosts = async () => {
      let url = 'blog/posts/';
      if (category) url += `?category=${category}`;
      if (tag) url += `?tag=${tag}`;
      
      const response = await api.get(url);
      setPosts(response.data);
      setLoading(false);
    };
    loadPosts();
  }, [category, tag]);

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <h2 className="text-2xl font-bold mb-6">
            {category ? `Category: ${category}` : tag ? `Tag: ${tag}` : 'Latest Posts'}
          </h2>
          <div className="space-y-6">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="md:w-1/4">
          <BlogCategories />
          <BlogTags />
        </div>
      </div>
    </div>
  );
}