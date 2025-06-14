import { Link } from "react-router-dom";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Stock = {
  id: string;
  symbol: string;
  name: string;
  invested: number;
  profit: number;
};

const mockData: Stock[] = [
  { id: "apple", symbol: "APPL",name: "Apple Inc.", invested: 1000, profit: 150 },
  { id: "tesla", symbol: "TSLA",name: "Tesla Inc.", invested: 2000, profit: -300 },
  { id: "microsoft", symbol: "MSFT", name: "Microsoft Corp.", invested: 1500, profit: 200 },
];

const InvestmentsTable = () => {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        My Investments (Mocked Data)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Invested (€)</TableCell>
              <TableCell>Profit (€)</TableCell>
              <TableCell>Profit (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((stock) => {
              const percent = ((stock.profit / stock.invested) * 100).toFixed(2);
              const profitColor = stock.profit >= 0 ? "green" : "red";

              return (
                <TableRow
                  key={stock.id}
                  hover
                  component={Link}
                  to={`/stocks/${stock.id}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.invested.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: profitColor }}>{stock.profit.toFixed(2)}</TableCell>
                  <TableCell sx={{ color: profitColor }}>{percent}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvestmentsTable;
