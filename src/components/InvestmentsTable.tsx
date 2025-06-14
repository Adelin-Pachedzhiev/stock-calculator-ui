import { Link } from "react-router-dom";
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
import { getProfits } from "../services/stockProfitService";
import ErrorDialog from "./ErrorDialog";

type Stock = {
  id: string;
  symbol: string;
  name: string;
  invested: number;
  profit: number;
  profitPercentage: number;
};

const InvestmentsTable = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const profits = await getProfits();
        // Transform the data to match our Stock type
        const formattedData = profits.map((profit: any) => ({
          id: profit.symbol.toLowerCase(),
          symbol: profit.symbol,
          name: profit.name || profit.symbol, // Fallback to symbol if name is not provided
          invested: profit.invested || 0,
          profit: profit.stockProfit.profit,
          profitPercentage: profit.stockProfit.profitPercentage
        }));
        setStocks(formattedData);
      } catch (err) {
        setError('Failed to load investments');
        console.error('Error fetching investments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <TableCell align="right">Profit/Loss</TableCell>
                <TableCell align="right">Return</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => (
                <TableRow
                  key={stock.id}
                  hover
                  component={Link}
                  to={`/stocks/${stock.id}`}
                  sx={{ 
                    textDecoration: "none", 
                    color: "inherit",
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{stock.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{stock.symbol}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    ${stock.invested.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${stock.profit >= 0 ? '+' : ''}$${stock.profit.toFixed(2)}`}
                      color={stock.profit >= 0 ? 'success' : 'error'}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        minWidth: '100px',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${stock.profitPercentage >= 0 ? '+' : ''}${stock.profitPercentage.toFixed(2)}%`}
                      color={stock.profitPercentage >= 0 ? 'success' : 'error'}
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
