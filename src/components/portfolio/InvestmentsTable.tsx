import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getStockInvestmentProfitInfo } from "../../services/stockProfitService";
import type { StockInvestmentProfitInfo } from "../../types/stock";
import ErrorDialog from "../common/ErrorDialog";

interface InvestmentsTableProps {
  refreshKey?: boolean;
}

const InvestmentsTable = ({ refreshKey }: InvestmentsTableProps) => {
  const [stocks, setStocks] = useState<StockInvestmentProfitInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getStockInvestmentProfitInfo();
        setStocks(data);
      } catch (err) {
        setError('Failed to load investments');
        console.error('Error fetching investments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          background: theme.palette.background.paper,
          '& .MuiTableHead-root': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            '& .MuiTableCell-root': {
              fontWeight: 600,
              color: theme.palette.text.primary,
            },
          },
          '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              },
            },
          },
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Invested</TableCell>
                <TableCell align="right">Current Value</TableCell>
                <TableCell align="right">Shares</TableCell>
                <TableCell align="right">Profit/Loss</TableCell>
                <TableCell align="right">Return</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow
                  key={stock.stock.symbol}
                  hover
                  onClick={() => navigate(`/stock/${stock.stock.symbol}`)}
                  sx={{ 
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{stock.stock.name || stock.stock.symbol}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{stock.stock.symbol}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    ${stock.stockProfit.investedAmountInUsd.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    ${stock.stockProfit.currentValue.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {stock.stockProfit.totalShares.toFixed(5)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${stock.stockProfit.profit >= 0 ? '+' : ''}$${stock.stockProfit.profit.toFixed(2)}`}
                      color={stock.stockProfit.profit >= 0 ? 'success' : 'error'}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        minWidth: '100px',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${stock.stockProfit.profitPercentage >= 0 ? '+' : ''}${stock.stockProfit.profitPercentage.toFixed(2)}%`}
                      color={stock.stockProfit.profitPercentage >= 0 ? 'success' : 'error'}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        minWidth: '100px',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ErrorDialog message={error} onClose={() => setError(null)} />
    </>
  );
};

export default InvestmentsTable;
