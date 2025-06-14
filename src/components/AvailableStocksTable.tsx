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
import { getAvailableStocks } from "../services/stockProfitService";

const AvailableStocksTable = () => {
  const [stocks, setStocks] = useState<Array<{ symbol: string; name: string }>>(
    []
  );

  useEffect(() => {
    async function fetchData() {
      const availableStocks = await getAvailableStocks();
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
