import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

export const getTotalProfit = async (userId: number) => {
  const response = await api.get("/stock/profit/total", {
    params: { userId },
  });
  return response.data;
};

export const getProfits = async (userId: number) => {
  const response = await api.get("/stock-profit", {
    params: { userId },
  });
  return response.data;
};

export const getAvailableStocks = async () => {
  const response = await api.get("/stock/availableStocks");
  return response.data;
};
