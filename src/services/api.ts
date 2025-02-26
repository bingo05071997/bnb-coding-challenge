import axios from "axios";

const API_URL = "http://localhost:3000"; // Update if needed

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const createEntity = async (data: object) => {
  const response = await api.post("/entities", data);
  return response.data;
};

export const getEntity = async (uuid: string) => {
  const response = await api.get(`/entities/${uuid}`);
  return response.data;
};

export const updateEntity = async (uuid: string, data: object) => {
  const response = await api.patch(`/entities/${uuid}`, data);
  return response.data;
};
