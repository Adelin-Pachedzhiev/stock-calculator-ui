import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockDetails, getStockPriceHistory, getStockTransactions } from "../services/stockService";
import StockTransactionForm from "../components/transactions/StockTransactionForm";
import { deleteStockTransaction } from "../services/stockTransactionService";
import StockHeader from "../components/stock/StockHeader";
import StockPriceChart from "../components/stock/StockPriceChart";
import StockTransactionsTable from "../components/stock/StockTransactionsTable";
import type { StockDetails, Transaction, PriceHistory } from "../types/stock";

const Stock = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const theme = useTheme();

  const [stock, setStock] = useState<StockDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

  const fetchStockTransactions = async () => {
    if (!symbol) return;
    try {
      const transactions = await getStockTransactions(symbol);
      setTransactions(transactions);
    } catch (error) {
      console.error("Failed to fetch stock transactions", error);
    }
  }

  const handleAddClick = () => {
    setSelectedTransactionId(null);
    setIsTransactionDialogOpen(true);
  };

  const handleEditClick = (id: number) => {
    setSelectedTransactionId(id);
    setIsTransactionDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedTransactionId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedTransactionId) {
      try {
        await deleteStockTransaction(selectedTransactionId);
        fetchStockTransactions();
      } catch (error) {
        console.error("Failed to delete transaction", error);
      } finally {
        setIsDeleteDialogOpen(false);
        setSelectedTransactionId(null);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;
      try {
        setLoading(true);
        const [details, transactions, history] = await Promise.all([
          getStockDetails(symbol),
          getStockTransactions(symbol),
          getStockPriceHistory(symbol)
        ]);
        setStock(details);
        setTransactions(transactions);
        setPriceHistory(history);
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!stock) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Stock not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        <StockHeader stock={stock} onAddTransaction={handleAddClick} />

        <StockPriceChart priceHistory={priceHistory} />

        {transactions.length > 0 && (
          <StockTransactionsTable 
            transactions={transactions} 
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        )}

        <StockTransactionForm
          open={isTransactionDialogOpen}
          onClose={() => setIsTransactionDialogOpen(false)}
          onTransactionCreated={() => {
            fetchStockTransactions();
            setIsTransactionDialogOpen(false);
          }}
          transactionId={selectedTransactionId}
        />

        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Stock; 