import axios from "./axiosInstance"

export async function login(data) {
  const response = await axios.post("/auth/login", data)
  return response.data
}

export async function logout() {
  await axios.post("/auth/logout")
  localStorage.removeItem("userData")
  localStorage.removeItem("token")
}

export async function register(data) {
  const formData = new FormData()

  // Añadir todos los campos
  for (const key in data) {
    if (data[key]) {
      formData.append(key, data[key])
    }
  }
  console.log(formData)

  const response = await axios.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

export async function getUserData() {
  const response = await axios.get("/auth/me")
  return await response.data
}
