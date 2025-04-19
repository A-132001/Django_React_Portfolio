export default function ProjectCard({ project, onEdit, onDelete }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.split(',').map(tech => (
              <span key={tech} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {tech.trim()}
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            )}
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }