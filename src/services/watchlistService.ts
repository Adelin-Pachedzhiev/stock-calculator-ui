import api from "./axiosInstanceProvider";
import type { StockDetails } from "../types/stock";

export const getWatchlist = async (): Promise<StockDetails[]> => {
  const response = await api.get("/watchlist");
  return response.data;
};

export const addToWatchlist = async (stockId: number): Promise<void> => {
  await api.post(`/watchlist/${stockId}`);
};

export const removeFromWatchlist = async (stockId: number): Promise<void> => {
  await api.delete(`/watchlist/${stockId}`);
};

export const isInWatchlist = async (stockId: number): Promise<boolean> => {
  const response = await api.get(`/watchlist/${stockId}`);
  return response.data === true;
}; 