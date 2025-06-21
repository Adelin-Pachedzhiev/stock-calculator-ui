import {
    Button,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { format } from "date-fns";
import type { Transaction } from "../../types/stock";

interface StockTransactionsTableProps {
    transactions: Transaction[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const StockTransactionsTable = ({ transactions, onEdit, onDelete }: StockTransactionsTableProps) => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Your Transactions</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Fee</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>{format(tx.timeOfTransaction, 'PPpp')}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={tx.type}
                                        color={tx.type === 'BUY' ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">{tx.quantity}</TableCell>
                                <TableCell align="right">${tx.price.toFixed(2)}</TableCell>
                                <TableCell align="right">${tx.fee.toFixed(2)}</TableCell>
                                <TableCell align="right">${(tx.quantity * tx.price + tx.fee).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <Button size="small" sx={{ mr: 1 }} onClick={() => onEdit(tx.id)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => onDelete(tx.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StockTransactionsTable; 