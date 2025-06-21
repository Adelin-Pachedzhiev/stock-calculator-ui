import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import PortfolioValueCard from "../components/portfolio/PortfolioValueCard";
import ProfitPerStockCard from "../components/portfolio/ProfitPerStockCard";
import AvailableStocksTable from "../components/dashboard/AvailableStocksTable";
import StockTransactionsTable from "../components/portfolio/StockTransactionsTable";
import InvestmentsTable from "../components/portfolio/InvestmentsTable";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6">Stock Portfolio Dashboard</Typography>
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <PortfolioValueCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProfitPerStockCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <AvailableStocksTable />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StockTransactionsTable />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InvestmentsTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
