import api from "./axiosInstanceProvider";

export interface PortfolioOverview {
  totalProfit: number;
  totalProfitPercentage: number;
  totalInvestmentCost: number;
  currentMarketValue: number;
}

export const getPortfolioOverview = async (): Promise<PortfolioOverview> => {
  const response = await api.get("/portfolio/overview");
  return response.data;
}; 