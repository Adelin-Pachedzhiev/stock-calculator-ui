import { useState, useEffect, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import { getAllStocks, deleteStock, type StockEntity } from '../../services/stockService';
import StockFormDialog from './StockFormDialog';
import ErrorDialog from '../common/ErrorDialog';

const StocksTable = () => {
  const [stocks, setStocks] = useState<StockEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [stockToDelete, setStockToDelete] = useState<StockEntity | null>(null);
  const [editingStock, setEditingStock] = useState<StockEntity | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const data = await getAllStocks();
      setStocks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load stocks');
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleEdit = (stock: StockEntity) => {
    setEditingStock(stock);
    setFormDialogOpen(true);
  };

  const handleDelete = (stock: StockEntity) => {
    setStockToDelete(stock);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!stockToDelete) return;

    try {
      setIsDeleting(true);
      await deleteStock(stockToDelete.id);
      setStocks(stocks.filter(s => s.id !== stockToDelete.id));
      setDeleteDialogOpen(false);
      setStockToDelete(null);
    } catch (err) {
      setError('Failed to delete stock');
      console.error('Error deleting stock:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStockSaved = () => {
    fetchStocks();
    setFormDialogOpen(false);
    setEditingStock(null);
  };

  const handleAddNew = () => {
    setEditingStock(null);
    setFormDialogOpen(true);
  };

  const handleFormClose = () => {
    setFormDialogOpen(false);
    setEditingStock(null);
  };

  const filteredStocks = useMemo(() => {
    if (!searchTerm.trim()) {
      return stocks;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return stocks.filter(stock =>
      stock.symbol.toLowerCase().includes(lowerSearchTerm) ||
      stock.name.toLowerCase().includes(lowerSearchTerm) ||
      stock.description.toLowerCase().includes(lowerSearchTerm)
    );
  }, [stocks, searchTerm]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Stocks Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNew}
        >
          Add New Stock
        </Button>
      </Box>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search stocks by symbol, name, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '10%' }}>Symbol</TableCell>
              <TableCell sx={{ width: '20%' }}>Name</TableCell>
              <TableCell sx={{ width: '55%' }}>Description</TableCell>
              <TableCell align="center" sx={{ width: '15%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStocks.map((stock) => (
              <TableRow key={stock.id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {stock.symbol}
                  </Typography>
                </TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      maxWidth: '100%',
                      wordWrap: 'break-word',
                      whiteSpace: 'normal',
                      lineHeight: 1.4,
                    }}
                  >
                    {stock.description}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(stock)}
                    sx={{ mr: 1 }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(stock)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredStocks.length === 0 && stocks.length > 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No stocks found matching your search
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {stocks.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No stocks found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the stock "{stockToDelete?.symbol} - {stockToDelete?.name}"?
            This will delete all transactions for this stock and all data for stock price.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <StockFormDialog
        open={formDialogOpen}
        onClose={handleFormClose}
        onStockSaved={handleStockSaved}
        stock={editingStock}
      />

      <ErrorDialog message={error} onClose={() => setError(null)} />
    </Box>
  );
};

export default StocksTable;
