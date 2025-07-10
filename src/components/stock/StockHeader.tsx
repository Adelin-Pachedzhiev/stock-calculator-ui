import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { StockDetails } from "../../types/stock";

interface StockHeaderProps {
    stock: StockDetails;
    onAddTransaction: () => void;
    isInWatchlist: boolean;
    onToggleWatchlist: () => void;
}

const StockHeader = ({ stock, onAddTransaction, isInWatchlist, onToggleWatchlist }: StockHeaderProps) => {
    return (
        <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {stock.name} ({stock.symbol})
                    </Typography>
                    <Typography variant="h5" component="p">
                        ${stock.currentPrice.toFixed(2)}
                        <Typography component="span" sx={{ ml: 1.5, color: stock.change >= 0 ? 'success.main' : 'error.main' }}>
                            {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </Typography>
                    </Typography>
                </div>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button variant="contained" color="primary" onClick={onAddTransaction}>
                        Add Transaction
                    </Button>
                    <IconButton onClick={onToggleWatchlist} color={isInWatchlist ? 'warning' : 'default'} aria-label="Toggle Watchlist">
                        {isInWatchlist ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default StockHeader; 