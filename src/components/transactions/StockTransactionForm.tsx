import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createStockTransaction,
  getStockTransaction,
  TransactionType,
  updateStockTransaction,
} from "../../services/stockTransactionService";
import type { TransactionPayload } from "../../services/stockTransactionService";
import { getAvailableStocks, type StockEntity } from "../../services/stockService";

interface StockTransactionFormProps {
  open: boolean;
  onClose: () => void;
  onTransactionCreated?: () => void;
  transactionId?: number | null;
  stockSymbol?: string | null;
}

const StockTransactionForm = ({
  open,
  onClose,
  onTransactionCreated,
  transactionId,
  stockSymbol,
}: StockTransactionFormProps) => {
  const [symbol, setSymbol] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fee, setFee] = useState("0");
  const [type, setType] = useState<TransactionType>(TransactionType.BUY);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stocks, setStocks] = useState<StockEntity[]>([]);

  useEffect(() => {
    if (open && stocks.length === 0) {
      const fetchStocks = async () => {
        try {
          const availableStocks = await getAvailableStocks();
          setStocks(availableStocks);
        } catch (error) {
          setError("Failed to fetch available stocks.");
        }
      };

      fetchStocks();
    }
  }, [open, stocks]);

  useEffect(() => {
    if (stockSymbol && !transactionId) {
      setSymbol(stockSymbol);
    }
  }, [stockSymbol, transactionId]);

  useEffect(() => {
    if (transactionId && open) {
      const fetchTransaction = async () => {
        try {
          const tx = await getStockTransaction(transactionId);
          setSymbol(tx.symbol);
          setTime(tx.timeOfTransaction);
          setPrice(tx.price.toString());
          setQuantity(tx.quantity.toString());
          setFee(tx.fee.toString());
          setType(tx.type);
        } catch (error) {
          setError("Failed to fetch transaction details.");
        }
      };
      fetchTransaction();
    } else if (!open) {
      handleClose(true);
    }
  }, [transactionId, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const selectedStock = stocks.find((s) => s.symbol === symbol);
      if (!selectedStock) {
        throw new Error("Invalid stock selected");
      }

      const data: TransactionPayload = {
        stockId: selectedStock.id,
        quantity: +quantity,
        price: +price,
        fee: +fee,
        type,
        timeOfTransaction: time,
      };

      if (transactionId) {
        await updateStockTransaction(transactionId, data);
      } else {
        await createStockTransaction(data);
      }

      if (onTransactionCreated) {
        onTransactionCreated();
      }
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save transaction"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (isInternalCall = false) => {
    // Reset form state
    setSymbol("");
    setTime("");
    setPrice("");
    setQuantity("");
    setFee("0");
    setType(TransactionType.BUY);
    setError(null);
    if (!isInternalCall) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={() => handleClose()} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{transactionId ? "Edit" : "Create"} Stock Transaction</Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 2 }}>
            <TextField
              select
              label="Stock Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
              fullWidth
            >
              {stocks.map((s) => (
                <MenuItem key={s.id} value={s.symbol}>
                  {`${s.symbol} - ${s.name}`}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Time of Transaction"
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <Box display="flex" gap={2} flexWrap="wrap">
              <TextField
                label="Price (€)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                sx={{ flex: 1, minWidth: 140 }}
              />
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                sx={{ flex: 1, minWidth: 140 }}
              />
              <TextField
                label="Fee (€)"
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                sx={{ flex: 1, minWidth: 140 }}
              />
            </Box>

            <TextField
              select
              label="Transaction Type"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionType)}
              required
              fullWidth
            >
              <MenuItem value={TransactionType.BUY}>Buy</MenuItem>
              <MenuItem value={TransactionType.SELL}>Sell</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => handleClose()}
            color="inherit"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ minWidth: 120 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StockTransactionForm;
