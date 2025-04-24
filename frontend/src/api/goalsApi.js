import axios from "./axiosInstance";

export async function crearMeta(data) {
  const res = await axios.post("/metas", data);
  return res.data;
}