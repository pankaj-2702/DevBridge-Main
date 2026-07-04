import axios from 'axios'

const api = axios.create({
  
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')  // ← read token directly
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api