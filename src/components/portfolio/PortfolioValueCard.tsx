import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getPortfolioOverview } from "../../services/portfolioService";
import type { PortfolioOverview } from "../../services/portfolioService";
import ErrorDialog from "../common/ErrorDialog";
import StatCard from "../common/StatCard";

const PortfolioValueCard = () => {
  const [overview, setOverview] = useState<PortfolioOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPortfolioOverview();
        setOverview(data);
      } catch (err) {
        setError("Failed to load portfolio overview.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Portfolio Value"
            value={`$${overview?.currentMarketValue?.toFixed(2) || "0.00"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Total Invested"
            value={`$${overview?.totalInvestmentCost?.toFixed(2) || "0.00"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <StatCard
            title="Unrealized Gain/Loss"
            value={`${overview?.totalProfit ?? 0 >= 0 ? '+' : ''}$${overview?.totalProfit?.toFixed(2) || "0.00"}`}
            secondaryValue={`(${overview?.totalProfitPercentage ?? 0 >= 0 ? '+' : ''}${overview?.totalProfitPercentage?.toFixed(2) || "0.00"}%)`}
            valueColor={overview?.totalProfit ?? 0 >= 0 ? "success.main" : "error.main"}
          />
        </Grid>
      </Grid>
      <ErrorDialog message={error} onClose={() => setError(null)} />
    </>
  );
};

export default PortfolioValueCard; 