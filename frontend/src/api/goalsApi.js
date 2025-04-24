import axios from "./axiosInstance";

const usarDatosFake = true;


export async function createGoal(data) {
  return (await axios.post("/goals", data)).data;
}

export async function getCategories() {
  if (usarDatosFake) {
    return [
      { id: 1, name: "Alimentación1" },
      { id: 2, name: "Alimentación2" },
      { id: 3, name: "Alimentación3" },
      { id: 4, name: "Alimentación4" },
    ];
  }

  return (await axios.get("/categorias")).data;
}
