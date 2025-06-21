import api from "./axiosInstanceProvider";

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}

export interface CreateTransactionRequest {
  stockId: number;
  quantity: number;
  price: number;
  fee: number;
  type: TransactionType;
  timeOfTransaction: string;
}

export const createStockTransaction = async (data: CreateTransactionRequest) => {
  try {
    const response = await api.post("/stock/transactions", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 