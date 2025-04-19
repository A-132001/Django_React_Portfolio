import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add these headers for file uploads
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Export the `api` object along with other functions
export const fetchProjects = async () => {
    try {
        const response = await api.get('projects/');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const createProject = async (projectData) => {
    try {
        const response = await api.post('projects/', projectData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (id, projectData) => {
    try {
        const response = await api.put(`projects/${id}/`, projectData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteProject = async (id) => {
    try {
        await api.delete(`projects/${id}/`);
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

export const login = (credentials) => api.post('auth/login/', credentials);
export const register = (userData) => api.post('auth/register/', userData);

export default api; // Export the `api` object
