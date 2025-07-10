export interface StockDetails {
    stockId: number;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    change: number;
    changePercent: number;
}
export interface PriceHistory {
    date: string;
    price: number;
}

export interface Transaction {
    id: number;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    fee: number;
    timeOfTransaction: Date;
}

export interface StockProfit {
    profit: number;
    profitPercentage: number;
    currentValue: number;
    investedAmountInUsd: number;
    totalShares: number;
}

export interface StockInfo {
    id: number;
    symbol: string;
    name: string;
    description: string;
}

export interface StockInvestmentProfitInfo {
    stock: StockInfo;
    stockProfit: StockProfit;
} 