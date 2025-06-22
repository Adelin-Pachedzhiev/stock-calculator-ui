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
import { getAvailableStocks, type StockEntity } from "../../services/stockService";

const AvailableStocksTable = () => {
  const [stocks, setStocks] = useState<StockEntity[]>([]);

  useEffect(() => {
    async function fetchData() {
      const availableStocks : StockEntity[] = await getAvailableStocks();
      setStocks(availableStocks);
    }

    fetchData();
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Stocks
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock, index) => (
              <TableRow key={index}>
                <TableCell>{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AvailableStocksTable;
