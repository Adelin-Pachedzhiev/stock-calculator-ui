import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTotalProfit } from "../services/stockProfitService";

const PortfolioValueCard = () => {
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const totalProfit = await getTotalProfit();
      setProfit(totalProfit.profit);
      // For now, we'll use a mock total value. In a real app, this would come from the backend
      setTotalValue(4500); // Mock value
    };
    fetchData();
  }, []);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Total Portfolio Value
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          ${totalValue?.toFixed(2) || "0.00"}
        </Typography>
        <Typography
          variant="h6"
          color={profit && profit > 0 ? "success.main" : "error.main"}
        >
          {profit !== null
            ? `${profit > 0 ? "+" : ""}$${profit.toFixed(2)}`
            : "$0.00"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Unrealized Gain/Loss
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PortfolioValueCard; 