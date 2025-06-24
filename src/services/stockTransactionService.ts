import api from "./axiosInstanceProvider";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface TransactionPayload {
  stockId: number;
  quantity: number;
  price: number;
  fee: number;
  type: TransactionType;
  timeOfTransaction: string;
  currency: string;
}

export const createStockTransaction = async (data: TransactionPayload) => {
  try {
    const response = await api.post("/stock/transactions", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStockTransaction = async (id: number) => {
  try {
    const response = await api.get(`/stock/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateStockTransaction = async (id: number, data: TransactionPayload) => {
    try {
        const response = await api.put(`/stock/transactions/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteStockTransaction = async (id: number) => {
    try {
        const response = await api.delete(`/stock/transactions/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}; 