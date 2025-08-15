import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { createStock, updateStock, type StockEntity } from '../../services/stockService';

interface StockFormDialogProps {
  open: boolean;
  onClose: () => void;
  onStockSaved: () => void;
  stock?: StockEntity | null;
}

const StockFormDialog = ({ open, onClose, onStockSaved, stock }: StockFormDialogProps) => {
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!stock;

  useEffect(() => {
    if (open) {
      if (stock) {
        // Editing existing stock
        setSymbol(stock.symbol);
        setName(stock.name);
        setDescription(stock.description);
      } else {
        // Creating new stock
        setSymbol('');
        setName('');
        setDescription('');
      }
      setError(null);
    }
  }, [open, stock]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!symbol.trim() || !name.trim()) {
      setError('Symbol and name are required');
      return;
    }

    if (symbol.length > 10) {
      setError('Symbol must be 10 characters or less');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const stockData = {
        symbol: symbol.trim().toUpperCase(),
        name: name.trim(),
        description: description.trim(),
      };

      if (isEditing && stock) {
        await updateStock(stock.id, stockData);
      } else {
        await createStock(stockData);
      }

      onStockSaved();
    } catch (err: unknown) {
      let errorMessage = `Failed to ${isEditing ? 'update' : 'create'} stock`;
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEditing ? 'Edit Stock' : 'Add New Stock'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              autoFocus
              margin="normal"
              label="Symbol"
              fullWidth
              variant="outlined"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              disabled={isSubmitting}
              required
              inputProps={{ maxLength: 10 }}
              helperText="Stock symbol (e.g., AAPL, TSLA)"
            />
            
            <TextField
              margin="normal"
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              required
              helperText="Company name (e.g., Apple Inc., Tesla Inc.)"
            />
            
            <TextField
              margin="normal"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              helperText="Brief description of the company"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !symbol.trim() || !name.trim()}
          >
            {isSubmitting ? (
              <CircularProgress size={20} />
            ) : (
              isEditing ? 'Update' : 'Create'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StockFormDialog;
