import { Box, Button, Paper, Typography } from "@mui/material";
import type { StockDetails } from "../../types/stock";

interface StockHeaderProps {
    stock: StockDetails;
    onAddTransaction: () => void;
}

const StockHeader = ({ stock, onAddTransaction }: StockHeaderProps) => {
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
                <Button variant="contained" color="primary" onClick={onAddTransaction}>
                    Add Transaction
                </Button>
            </Box>
        </Paper>
    );
};

export default StockHeader; 