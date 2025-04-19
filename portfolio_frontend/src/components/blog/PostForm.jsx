import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api'; // Fix the import
import ReactMarkdown from 'react-markdown';

export default function PostForm({ post = null }) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    is_published: post?.is_published || false,
    categories: post?.categories?.map(c => c.id) || [],
    tags: post?.tags?.map(t => t.id) || [],
    cover_image: null
  });
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          api.get('blog/categories/'),
          api.get('blog/tags/')
        ]);
        setAllCategories(categoriesRes.data || []); // Handle empty response
        setAllTags(tagsRes.data || []); // Handle empty response
      } catch (error) {
        console.error('Error loading options:', error);
      }
    };
    loadOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, option => Number(option.value));
    setFormData(prev => ({ ...prev, [e.target.name]: options }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, cover_image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(item => data.append(key, item));
        } else {
          data.append(key, formData[key]);
        }
      }
    });

    try {
      if (post) {
        await api.patch(`blog/posts/${post.id}/`, data);
      } else {
        await api.post('blog/posts/', data);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>
      
      <div className="flex mb-4">
        <button
          onClick={() => setPreview(false)}
          className={`px-4 py-2 ${!preview ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Edit
        </button>
        <button
          onClick={() => setPreview(true)}
          className={`px-4 py-2 ${preview ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Preview
        </button>
      </div>

      {preview ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
          <div className="prose max-w-none">
            <ReactMarkdown>{formData.content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Slug*</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Content*</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border rounded font-mono"
              rows="10"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Cover Image</label>
            <input
              type="file"
              name="cover_image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              accept="image/*"
              required={!post}
            />
            {post?.cover_image && (
              <img 
                src={post.cover_image} 
                alt="Current cover" 
                className="mt-2 h-32 object-cover"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Categories</label>
              <select
                name="categories"
                multiple
                value={formData.categories}
                onChange={handleMultiSelect}
                className="w-full p-2 border rounded h-auto min-h-[100px]"
              >
                {allCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Tags</label>
              <select
                name="tags"
                multiple
                value={formData.tags}
                onChange={handleMultiSelect}
                className="w-full p-2 border rounded h-auto min-h-[100px]"
              >
                {allTags.map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              id="is_published"
              className="mr-2"
            />
            <label htmlFor="is_published">Publish this post</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/blog')}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}