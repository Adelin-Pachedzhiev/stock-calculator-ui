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
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getTransactions } from '../services/stockProfitService';
import ErrorDialog from './ErrorDialog';

type Transaction = {
  id: number;
  stock: {
    symbol: string;
    name: string;
  };
  timeOfTransaction: Date;
  price: number;
  quantity: number;
  fee: number;
  type: string;
};

const StockTransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        // Convert string dates to Date objects
        const formattedData = data.map((tx: any) => ({
          ...tx,
          timeOfTransaction: new Date(tx.timeOfTransaction)
        }));
        setTransactions(formattedData);
      } catch (err) {
        setError('Failed to load transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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
                <TableCell>Date</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Fee</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {format(transaction.timeOfTransaction, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{transaction.stock.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{transaction.stock.symbol}</TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={transaction.type === 'BUY' ? 'success' : 'error'}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        minWidth: '80px',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    {transaction.quantity}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    ${transaction.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary' }}>
                    ${transaction.fee.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 500 }}>
                    ${((transaction.price * transaction.quantity) + transaction.fee).toFixed(2)}
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

export default StockTransactionsTable; 