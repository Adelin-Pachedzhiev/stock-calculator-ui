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
import { getProfits } from "../services/stockProfitService";

const ProfitPerStockCard = () => {
  const [profitsPerStock, setProfitPerStock] = useState<
    Array<{
      symbol: string;
      stockProfit: { profit: number; profitPercentage: number };
    }>
  >([]);

  useEffect(() => {
    async function fetchData() {
      const profits = await getProfits();

      setProfitPerStock(profits);
    }

    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Profits per Stock
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Profit %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profitsPerStock.map((profitPerStock, index) => (
              <TableRow key={index}>
                <TableCell>{profitPerStock.symbol}</TableCell>
                <TableCell>
                  {profitPerStock.stockProfit.profit.toFixed(2)}
                </TableCell>
                <TableCell>
                  {profitPerStock.stockProfit.profitPercentage.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProfitPerStockCard;
