import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getStockProfitBySymbol } from "../../services/stockProfitService";
import type { StockProfit } from "../../types/stock";
import { formatCurrency, formatCurrencyWithSign, formatPercentageWithSign } from "../../utils/formatting";
import ErrorDialog from "../common/ErrorDialog";
import StatCard from "../common/StatCard";

interface StockProfitCardProps {
  symbol: string;
  refreshKey?: boolean;
}

const StockProfitCard = ({ symbol, refreshKey }: StockProfitCardProps) => {
  const [profit, setProfit] = useState<StockProfit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getStockProfitBySymbol(symbol);
        setProfit(data);
        setError(null);
      } catch (err) {
        setError("Failed to load profit information.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, refreshKey]);

  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profit || profit.totalShares === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No current position in {symbol}. Add some transactions to see profit information.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Current Value"
            value={formatCurrency(profit.currentValue)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Total Invested"
            value={formatCurrency(profit.investedAmountInUsd)}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Unrealized Gain/Loss"
            value={formatCurrencyWithSign(profit.profit)}
            secondaryValue={`(${formatPercentageWithSign(profit.profitPercentage)})`}
            valueColor={(profit.profit ?? 0) >= 0 ? "success.main" : "error.main"}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard
            title="Total Shares"
            value={profit.totalShares.toString()}
          />
        </Grid>
      </Grid>
      <ErrorDialog message={error} onClose={() => setError(null)} />
    </>
  );
};

export default StockProfitCard;
