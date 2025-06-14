import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import CurrentProfitCard from "../components/CurrentProfitCard";
import ProfitPerStockCard from "../components/ProfitPerStockCard";
import AvailableStocksTable from "../components/AvailableStocksTable";
import TransactionsTable from "../components/TransactionsTable";
import { useNavigate } from "react-router-dom";
import InvestmentsTable from "../components/InvestmentsTable";
import StockTransactionForm from "../components/StockTransactionForm";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box>
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
          <Grid>
            <CurrentProfitCard />
          </Grid>
          <Grid>
            <ProfitPerStockCard />
          </Grid>
          <Grid>
            <AvailableStocksTable />
          </Grid>
          <Grid>
            <TransactionsTable />
          </Grid>
          <Grid>
            <InvestmentsTable />
          </Grid>
          <Grid>
            <StockTransactionForm/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
