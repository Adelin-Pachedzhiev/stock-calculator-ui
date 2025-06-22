import api from "./axiosInstanceProvider";

export const getStockDetails = async (symbol: string) => {
  // const response = await api.get(`/stock/${symbol}`);
  // return response.data;
  console.log(`Fetching details for ${symbol}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    symbol: symbol.toUpperCase(),
    name: `${symbol.toUpperCase()} Inc.`,
    currentPrice: Math.random() * 500 + 100,
    change: (Math.random() - 0.5) * 20,
    changePercent: (Math.random() - 0.5) * 0.1,
  };
};

export const getStockTransactions = async (symbol: string) => {
    // const response = await api.get(`/stock/${symbol}/transactions`);
    // return response.data;
    console.log(`Fetching transactions for ${symbol}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 1, type: 'BUY' as const, quantity: 10, price: 150.00, fee: 5.00, timeOfTransaction: new Date('2023-01-15') },
        { id: 2, type: 'BUY' as const, quantity: 5, price: 155.00, fee: 5.00, timeOfTransaction: new Date('2023-03-10') },
        { id: 3, type: 'SELL' as const, quantity: 8, price: 170.00, fee: 5.00, timeOfTransaction: new Date('2023-05-20') },
    ];
}

export const getStockPriceHistory = async (symbol: string) => {
    // const response = await api.get(`/stock/${symbol}/history`);
    // return response.data;
    console.log(`Fetching price history for ${symbol}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = [];
    let price = Math.random() * 200 + 100;
    for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (30 - i));
        price += (Math.random() - 0.5) * 5;
        data.push({ date: date.toISOString().split('T')[0], price: price });
    }
    return data;
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