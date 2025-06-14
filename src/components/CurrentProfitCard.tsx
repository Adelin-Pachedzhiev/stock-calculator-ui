import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getTotalProfit } from "../services/stockProfitService";

const CurrentProfitCard = () => {
  const [profit, setProfit] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const totalProfit = await getTotalProfit();
      setProfit(totalProfit.profit);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Current Profit
        </Typography>
        <Typography
          variant="h4"
          color={profit && profit > 0 ? "success.main" : "error.main"}
        >
          {profit !== null
            ? `${profit > 0 ? "+" : ""}$${profit.toFixed(2)}`
            : "$0.00"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentProfitCard;
