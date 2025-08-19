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
import { getStockDetails, getStockTransactions } from "../services/stockService";
import StockTransactionForm from "../components/transactions/StockTransactionForm";
import { deleteStockTransaction } from "../services/stockTransactionService";
import StockHeader from "../components/stock/StockHeader";
import StockProfitCard from "../components/stock/StockProfitCard";
import StockTransactionsTable from "../components/stock/StockTransactionsTable";
import StockNews from "../components/stock/StockNews";
import type { StockDetails, Transaction } from "../types/stock";
import {addToWatchlist, removeFromWatchlist, isInWatchlist as checkIsInWatchlist } from '../services/watchlistService';
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
  const [refreshKey, setRefreshKey] = useState(false);

  const fetchStockTransactions = async () => {
    if (!symbol) return;
    try {
      const transactions = await getStockTransactions(symbol);
      setTransactions(transactions);
      // Refresh the profit card when transactions change
      setRefreshKey(prev => !prev);
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
      } catch {
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
    } catch {
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

        <Box sx={{ mb: 4 }}>
          <StockProfitCard symbol={stock.symbol} refreshKey={refreshKey} />
        </Box>



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
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          mt: 4, 
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 700,
          width: '100%'
        }}>
          <Box sx={{ flex: 1, width: '100%', minWidth: 0 }}>
            <CompanyProfile symbol={stock.symbol} />
          </Box>
          <Box sx={{ flex: 1, width: '100%', minWidth: 0 }}>
            <FundamentalData symbol={stock.symbol} />
          </Box>
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