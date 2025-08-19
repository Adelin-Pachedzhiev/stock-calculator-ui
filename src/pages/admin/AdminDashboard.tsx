import { Box, Paper } from "@mui/material";
import StocksTable from "../../components/admin/StocksTable";

const AdminDashboard = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <StocksTable />
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
