import { useState } from "react";
import { Button } from "@mui/material";
import StockTransactionForm from "./StockTransactionForm";
import type { SxProps, Theme } from '@mui/material/styles';

interface AddTransactionDialogProps {
    onTransactionCreated: () => void;
    stockSymbol?: string | null;
    sx?: SxProps<Theme>;
}

const AddTransactionDialog = ({ onTransactionCreated, stockSymbol, sx }: AddTransactionDialogProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleTransactionCreated = () => {
        onTransactionCreated();
        setIsDialogOpen(false);
    }

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setIsDialogOpen(true)}
                sx={sx}
            >
                Add Transaction
            </Button>
            <StockTransactionForm
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onTransactionCreated={handleTransactionCreated}
                stockSymbol={stockSymbol}
            />
        </>
    );
};

export default AddTransactionDialog; 