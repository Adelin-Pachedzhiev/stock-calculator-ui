import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, alpha, useTheme, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getWatchlist } from '../../services/watchlistService';
import type { StockDetails } from '../../types/stock';

const WatchlistTable = () => {
  const theme = useTheme();
  const [watchlist, setWatchlist] = useState<StockDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWatchlist();
        setWatchlist(data);
      } catch (err) {
        setError('Failed to load watchlist');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, color: 'error.main' }}>
        {error}
      </Paper>
    );
  }

  if (!watchlist.length) {
    return (
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center', color: 'text.secondary' }}>
        There are no items in your watchlist.
      </Paper>
    );
  }

  return (
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
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Change (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchlist.map((stock) => (
              <TableRow key={stock.symbol} hover>
                <TableCell sx={{ fontWeight: 500 }}>{stock.name}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{stock.symbol}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 500 }}>
                  ${stock.currentPrice.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ color: stock.change >= 0 ? 'success.main' : 'error.main', fontWeight: 500 }}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default WatchlistTable; 