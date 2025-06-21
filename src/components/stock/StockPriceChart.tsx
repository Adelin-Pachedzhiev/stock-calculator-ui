import { Paper, Typography, useTheme } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PriceHistory } from "../../types/stock";

interface StockPriceChartProps {
    priceHistory: PriceHistory[];
}

const StockPriceChart = ({ priceHistory }: StockPriceChartProps) => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 3, mb: 4, height: 400 }}>
            <Typography variant="h6" gutterBottom>Price History (30 days)</Typography>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default StockPriceChart; 