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
} from "@mui/material";
import { useState } from "react";

const mockStocks = ["AAPL", "TSLA", "MSFT"];

interface StockTransactionFormProps {
  open: boolean;
  onClose: () => void;
}

const StockTransactionForm = ({ open, onClose }: StockTransactionFormProps) => {
  const [symbol, setSymbol] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fee, setFee] = useState("");
  const [type, setType] = useState("BUY");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      symbol,
      time,
      price: +price,
      quantity: +quantity,
      fee: +fee || 0,
      type,
    };
    console.log("Submitted transaction:", data);
    // Add your backend call here
    onClose(); // Close the dialog after submission
  };

  const handleClose = () => {
    // Reset form state
    setSymbol("");
    setTime("");
    setPrice("");
    setQuantity("");
    setFee("");
    setType("BUY");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Create Stock Transaction</Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} sx={{ mt: 2 }}>
            <TextField
              select
              label="Stock Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
              fullWidth
            >
              {mockStocks.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
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
                slotProps={{ htmlInput: { min: 0, step: "0.01" }}}
                sx={{ flex: 1, minWidth: 140 }}
              />
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                slotProps={{ htmlInput: { min: 1, step: "1" }}}
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
              onChange={(e) => setType(e.target.value)}
              required
              fullWidth
            >
              <MenuItem value="BUY">Buy</MenuItem>
              <MenuItem value="SELL">Sell</MenuItem>
            </TextField>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ minWidth: 120 }}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default StockTransactionForm;
