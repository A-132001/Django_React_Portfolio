import { useEffect, useState } from 'react';
import { fetchProjects, deleteProject, createProject, updateProject } from '../api';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      loadProjects();
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await createProject(formData);
      }
      setShowForm(false);
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">My Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add New Project
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => {
              setEditingProject(project);
              setShowForm(true);
            }}
            onDelete={() => handleDelete(project.id)}
          />
        ))}
      </div>
    </div>
  );
}