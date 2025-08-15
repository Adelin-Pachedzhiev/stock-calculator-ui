import type { StockDetails } from "../types/stock";
import api from "./axiosInstanceProvider";
import type { TransactionType } from "./stockTransactionService";


export const getStockDetails = async (symbol: string): Promise<StockDetails> => {
  const response = await api.get(`/stock/information/${symbol}`);
  return response.data;
};

export interface StockTransaction{
    id: number;
    stock: {
        symbol: string,
        name: string
    }
    lastChangedAt: Date;
    timeOfTransaction: Date;
    price: number;
    currency: string;
    quantity: number;
    fee: number;
    type: TransactionType
}
export const getStockTransactions = async (symbol: string): Promise<Array<StockTransaction>> => {
    
    const response = await api.get("/stock/transactions", {
        params: {symbol}
    });
    console.log(response)
    return response.data;
}

export interface StockEntity {
    id: number;
    symbol: string;
    name: string;
    description: string;
}

export const getAvailableStocks = async () : Promise<StockEntity[]> => {
    const response = await api.get("/stock");
    return response.data;
  };

// Admin-only stock management functions
export const getAllStocks = async (): Promise<StockEntity[]> => {
    const response = await api.get("/admin/stock");
    return response.data;
};

export const createStock = async (stock: Omit<StockEntity, 'id'>): Promise<StockEntity> => {
    const response = await api.post("/admin/stock", stock);
    return response.data;
};

export const updateStock = async (id: number, stock: Omit<StockEntity, 'id'>): Promise<StockEntity> => {
    const response = await api.put(`/admin/stock/${id}`, stock);
    return response.data;
};

export const deleteStock = async (id: number): Promise<void> => {
    await api.delete(`/admin/stock/${id}`);
};