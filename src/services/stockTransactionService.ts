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
    console.log(`Getting transaction ${id}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        id: id,
        stockId: 1,
        symbol: "AAPL",
        quantity: 10,
        price: 150.00,
        fee: 5.00,
        type: TransactionType.BUY,
        timeOfTransaction: new Date().toISOString().substring(0, 16)
    }
}

export const updateStockTransaction = async (id: number, data: TransactionPayload) => {
    try {
        // const response = await api.put(`/stock/transactions/${id}`, data);
        // return response.data;
        console.log(`Updating transaction ${id}`, data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    } catch (error) {
        throw error;
    }
}

export const deleteStockTransaction = async (id: number) => {
  try {
    // const response = await api.delete(`/stock/transactions/${id}`);
    // return response.data;
    console.log(`Deleting transaction ${id}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  } catch (error) {
    throw error;
  }
}; 