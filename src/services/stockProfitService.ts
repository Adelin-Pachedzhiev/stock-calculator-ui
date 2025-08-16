import api from "./axiosInstanceProvider";
import type { StockInvestmentProfitInfo, StockProfit } from "../types/stock";

export const getStockInvestmentProfitInfo = async (): Promise<StockInvestmentProfitInfo[]> => {
  const response = await api.get("/stock/profit");
  return response.data;
};

export const getStockProfitBySymbol = async (symbol: string): Promise<StockProfit> => {
  const response = await api.get(`/stock/profit/${symbol}`);
  return response.data;
};

export const getTransactions = async () => {
  const response = await api.get("/stock/transactions");
  return response.data;
};
