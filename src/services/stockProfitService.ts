import api from "./axiosInstanceProvider";
import type { StockInvestmentProfitInfo } from "../types/stock";

export const getStockInvestmentProfitInfo = async (): Promise<StockInvestmentProfitInfo[]> => {
  const response = await api.get("/stock/profit");
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get("/stock/transactions");
  return response.data;
};
