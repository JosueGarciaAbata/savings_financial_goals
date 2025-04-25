const apiUrl = import.meta.env.VITE_API_URL

export async function getAllDashboard() {
  const token = localStorage.getItem("token")

  const response = await fetch(`${apiUrl}/goals`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("No autorizado")
  }

  const data = await response.json()
  return data.data
}
