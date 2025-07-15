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
  useTheme,
  Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStockDetails, getStockTransactions } from "../services/stockService";
import StockTransactionForm from "../components/transactions/StockTransactionForm";
import { deleteStockTransaction } from "../services/stockTransactionService";
import StockHeader from "../components/stock/StockHeader";

import StockTransactionsTable from "../components/stock/StockTransactionsTable";
import StockNews from "../components/stock/StockNews";
import type { StockDetails, Transaction, PriceHistory } from "../types/stock";
import { getWatchlist, addToWatchlist, removeFromWatchlist, isInWatchlist as checkIsInWatchlist } from '../services/watchlistService';
import PriceChart from "../components/stock/PriceChart";
import FundamentalData from "../components/stock/FundamentalData";
import CompanyProfile from "../components/stock/CompanyProfile";

const Stock = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const theme = useTheme();

  const [stock, setStock] = useState<StockDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

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
        const [details, transactions] = await Promise.all([
          getStockDetails(symbol),
          getStockTransactions(symbol),
        ]);
        setStock(details);
        setTransactions(transactions);
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  useEffect(() => {
    if (!stock) return;
    const checkWatchlist = async () => {
      try {
        const result = await checkIsInWatchlist(stock.stockId);
        setIsInWatchlist(result);
      } catch (err) {
        setIsInWatchlist(false);
      }
    };
    checkWatchlist();
  }, [stock]);

  const handleToggleWatchlist = async () => {
    if (!stock) return;
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(stock.stockId);
        setIsInWatchlist(false);
      } else {
        await addToWatchlist(stock.stockId);
        setIsInWatchlist(true);
      }
    } catch (err) {
      // Optionally show error
    }
  };

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
        <StockHeader 
          stock={stock} 
          onAddTransaction={handleAddClick} 
          isInWatchlist={isInWatchlist}
          onToggleWatchlist={handleToggleWatchlist}
        />



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

        <Box sx={{ width: '100%', mt: 4, minHeight: 500 }}>
          <PriceChart symbol={stock.symbol} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '100%' }}}>
          <StockNews symbol={symbol || "TSLA"} />
        </Box>
        <Box sx={{ width: '100%', mt: 4, minHeight: 500 }}>
          <FundamentalData symbol={stock.symbol} />
        </Box>
        <Box sx={{ width: '100%', mt: 4, minHeight: 500 }}>
          <CompanyProfile symbol={stock.symbol} />
        </Box>
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