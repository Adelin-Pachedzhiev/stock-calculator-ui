import api from "./axiosInstanceProvider";
import type { StockDetails } from "../types/stock";

export const getWatchlist = async (): Promise<StockDetails[]> => {
  const response = await api.get("/watchlist");
  return response.data;
}; 