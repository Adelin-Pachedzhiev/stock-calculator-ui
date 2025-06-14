import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getTransactions } from "../services/stockProfitService";

const TransactionsTable = () => {
  const [stockTransactions, setStockTransactions] = useState<
    Array<{
      id: number;
      stock: { symbol: string; name: string };
      timeOfTransaction: Date;
      price: number;
      quantity: number;
      fee: number;
      type: string;
    }>
  >([]);

  useEffect(() => {
    async function fetchData() {
      const transactions = await getTransactions();

      setStockTransactions(transactions);
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transactions
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Stock</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Type</TableCell>
              {/* <TableCell>Time</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {stockTransactions.map((tx, index) => (
              <TableRow key={index}>
                <TableCell>{tx.stock.name}</TableCell>
                <TableCell>{tx.stock.symbol}</TableCell>
                <TableCell>{tx.quantity}</TableCell>
                <TableCell>{tx.price}</TableCell>
                <TableCell>{tx.fee}</TableCell>
                <TableCell>{tx.type}</TableCell>
                {/* <TableCell>{tx.timeOfTransaction.toString()}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
