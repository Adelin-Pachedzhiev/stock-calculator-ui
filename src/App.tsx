import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import { getAvailableStocks, getTotalProfit } from "./api/stockProfitService";

function App() {
  const [profit, setProfit] = useState<number | null>(null);
  const [stocks, setStocks] = useState<Array<{ symbol: string; name: string }>>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const availableStocks = await getAvailableStocks();
        const totalProfit = await getTotalProfit(1);

        setProfit(totalProfit.profit);
        setStocks(availableStocks);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Box>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Stock Portfolio Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4}>
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Current Profit
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    ${profit?.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
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
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default App;
