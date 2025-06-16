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
import InvestmentsTable from "../components/InvestmentsTable";
import StockTransactionForm from "../components/StockTransactionForm";
import StockTransactionsTable from "../components/StockTransactionsTable";

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

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <GradientHeader>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              My Portfolio
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsTransactionDialogOpen(true)}
              sx={{ 
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              Add Transaction
            </Button>
          </Stack>
        </GradientHeader>

        {/* Portfolio Stats */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Grid container spacing={3}>
            {/* Portfolio Value */}
            <Grid component="div" xs={12} md={6}>
              <StyledPaper elevation={2}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Total Portfolio Value
                </Typography>
                <Typography variant="h4" component="div">
                  $4,500.00
                </Typography>
              </StyledPaper>
            </Grid>

            {/* Unrealized Profit/Loss */}
            <Grid component="div" xs={12} md={6}>
              <StyledPaper elevation={2}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Unrealized Profit/Loss
                </Typography>
                <Typography variant="h4" color="success.main" component="div">
                  +$150.00
                </Typography>
              </StyledPaper>
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