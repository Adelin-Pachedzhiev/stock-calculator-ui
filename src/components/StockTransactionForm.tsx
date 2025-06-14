import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const mockStocks = ["AAPL", "TSLA", "MSFT"];

const StockTransactionForm = () => {
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
  };

  return (
    // <Paper sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create Stock Transaction
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            select
            label="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
            sx={{ minWidth: 180 }}
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
          />

          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              label="Price (€)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              sx={{ flex: 1, minWidth: 140 }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              sx={{ flex: 1, minWidth: 140 }}
            />
            <TextField
              label="Fee (€)"
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              sx={{ flex: 1, minWidth: 140 }}
            />
          </Box>

          <TextField
            select
            label="Transaction Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="BUY">Buy</MenuItem>
            <MenuItem value="SELL">Sell</MenuItem>
          </TextField>

          <Box mt={2}>
            <Button type="submit" variant="contained" size="large" fullWidth>
              Submit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StockTransactionForm;
