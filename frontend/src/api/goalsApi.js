import axios from "./axiosInstance"

export async function createGoal(data) {
  return (await axios.post("/goals", data)).data
}

export async function updateGoal(data) {
  return (await axios.put("/goals/"+data.goalId, data)).data
}

export async function getGoal(id) {
  const res = await axios.get(`/goals/${id}`)
  return res.data
}

export async function getContributions(goalId) {
  const res = await axios.get(`/goals/${goalId}/contributions`)
  return res.data.contributions
}

export async function createContribution(data) {
  return (await axios.post("/contributions", data)).data
}

export async function getCategories() {
  const response = await axios.get("/categories")
  return response.data.categories
}

export async function deleteContribution(id) {
  return (await axios.delete(`/contributions/${id}`)).data
}

export async function deleteGoal(id) {
  const res = await axios.delete(`/goals/${id}`)
  return res
}
