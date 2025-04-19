import { useState } from 'react';

export default function ProjectForm({ project = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies || '',
    github_url: project?.github_url || '',
    live_url: project?.live_url || '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    await onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div>
        <label className="block text-gray-700 mb-1">Title</label>
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
        <label className="block text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Technologies (comma separated)</label>
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">GitHub URL</label>
        <input
          type="url"
          name="github_url"
          value={formData.github_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Live Demo URL</label>
        <input
          type="url"
          name="live_url"
          value={formData.live_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Project Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          accept="image/*"
          required={!project}
        />
      </div>
      
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {project ? 'Update Project' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}