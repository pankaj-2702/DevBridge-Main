import api from './api'

// Get all projects
export const getProjects = async () => {
  const response = await api.get('/projects')
  return response.data
}

// Get single project by id
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`)
  return response.data
}

// Create new project
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData)
  return response.data
}

// Update project
export const updateProject = async (id, projectData) => {
  const response = await api.patch(`/projects/${id}`, projectData)
  return response.data
}

// Delete project
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`)
  return response.data
}

//MyProject
export const getMyProjects = async () => {
  const response = await api.get('/projects/me')
  return response.data
}