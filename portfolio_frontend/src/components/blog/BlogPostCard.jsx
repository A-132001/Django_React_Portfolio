import { Link } from 'react-router-dom';

export default function BlogPostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={post.cover_image} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.categories.map(category => (
            <Link 
              key={category.id}
              to={`/blog/category/${category.slug}`}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/blog/post/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link 
                key={tag.id}
                to={`/blog/tag/${tag.slug}`}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {new Date(post.published_date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}