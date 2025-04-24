import axios from "./axiosInstance"

export async function createGoal(data) {
  return (await axios.post("/goals", data)).data
}

export async function getGoal(id) {
  return (await axios.get(`/goals/${id}`)).data.data
}

export async function getContributions(goalId) {
  return (await axios.get(`/goals/${goalId}/contributions`)).data.contributions
}

export async function createContribution(data) {
  return (await axios.post("/contributions", data)).data
}

export async function getCategories() {
  const response = await axios.get("/categories")
  return response.data.categories
}
