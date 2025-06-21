import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  styled,
} from "@mui/material";
import InvestmentsTable from "../components/portfolio/InvestmentsTable";
import StockTransactionForm from "../components/transactions/StockTransactionForm";
import StockTransactionsTable from "../components/portfolio/StockTransactionsTable";
import PortfolioValueCard from "../components/portfolio/PortfolioValueCard";
import AddTransactionDialog from "../components/transactions/AddTransactionDialog";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 120,
}));

const GradientHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: 'white',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  '&::after': {
    content: '""',
    flex: 1,
    marginLeft: theme.spacing(2),
    height: '1px',
    backgroundColor: theme.palette.divider,
  },
}));

const Portfolio = () => {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const theme = useTheme();

  const handleTransactionCreated = () => {
    // For now, we can just log this. In a real app, we would refetch data.
    console.log("Transaction created, refresh portfolio data...");
    setIsTransactionDialogOpen(false);
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <GradientHeader>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              My Portfolio
            </Typography>
            <AddTransactionDialog 
              onTransactionCreated={handleTransactionCreated} 
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            />
          </Stack>
        </GradientHeader>

        {/* Portfolio Stats */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Grid container spacing={3}>
            {/* Portfolio Value and Unrealized Profit/Loss */}
            <Grid size={12}>
              <PortfolioValueCard />
            </Grid>
          </Grid>
        </Box>

        {/* Investments Table */}
        <Box sx={{ mb: 4 }}>
          <SectionTitle variant="h5" fontWeight="medium">
            My Investments
          </SectionTitle>
          <InvestmentsTable />
        </Box>

        {/* Stock Holdings Table */}
        <Box sx={{ mb: 4 }}>
          <SectionTitle variant="h5" fontWeight="medium">
            Recent Transactions
          </SectionTitle>
          <StockTransactionsTable />
        </Box>

        {/* Transaction Form Dialog */}
        <StockTransactionForm 
          open={isTransactionDialogOpen} 
          onClose={() => setIsTransactionDialogOpen(false)} 
        />
      </Container>
    </Box>
  );
};

export default Portfolio; 