import axios from "./axiosInstance";

const usarDatosFake = true;


export async function createGoal(data) {
  return (await axios.post("/goals", data)).data;
}

export async function getGoal(id) {
  if (usarDatosFake) {
    return {
      id: Number(id),
      name: "Ahorro para Laptop",
      category: { id: 2, name: "Tecnología" },
      target_amount: "1000.00",
      deadline: "2025-12-31",
      created_at: "2025-01-01",
    };
  }

  return (await axios.get(`/metas/${id}`)).data;
}

export async function getContributions(goalId) {
  if (usarDatosFake) {
    return [
      {
        id: 1,
        contribution_date: "2025-04-20",
        amount: "150.00",
      },
      {
        id: 2,
        contribution_date: "2025-04-22",
        amount: "200.50",
      },
    ];
  }

  return (await axios.get(`/metas/${goalId}/aportes`)).data;
}

export async function createContribution(data) {
  if (usarDatosFake) {
    console.log("📦 FAKE: createContribution:", data);
    return { id: Date.now(), ...data };
  }

  return (await axios.post("/aportes", data)).data;
}

export async function getCategories() {
  if (usarDatosFake) {
    return [
      { id: 1, name: "Alimentación1" },
      { id: 2, name: "Tecnología" },
      { id: 3, name: "Vacaciones" },
      { id: 4, name: "Emergencias" },
    ];
  }

  return (await axios.get("/categorias")).data;
}