import { Card, CardContent, Typography, Box } from "@mui/material";
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
      // setTotalValue(4500); // Mock value
    };
    fetchData();
  }, []);

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          px: 4,
          py: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="body2" color="text.secondary">
            Total Portfolio Value
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
            ${totalValue?.toFixed(2) || "0.00"}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <Typography variant="body2" color="text.secondary">
            Unrealized Gain/Loss
          </Typography>
          <Typography
            variant="h5"
            color={profit && profit > 0 ? "success.main" : "error.main"}
            sx={{ fontWeight: 600 }}
          >
            {profit !== null
              ? `${profit > 0 ? "+" : ""}$${profit.toFixed(2)}`
              : "$0.00"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioValueCard; 