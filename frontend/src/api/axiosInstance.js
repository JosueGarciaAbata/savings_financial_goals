import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Tiempo de espera de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para incluir automáticamente el token en cada petición
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  // ❗ NO añadir Authorization si es /auth/login o /auth/register
  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default axiosInstance
