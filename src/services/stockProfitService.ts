import api from "./axiosInstanceProvider";

export const getProfits = async () => {
  const response = await api.get("/stock/profit");
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get("/stock/transactions");
  return response.data;
};
