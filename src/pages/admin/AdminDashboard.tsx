import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import StocksTable from '../../components/admin/StocksTable';

const AdminDashboard = () => {
  const { userEmail } = useAuth();

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hello Captain! 🚢
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome to the admin dashboard
        </Typography>
        {userEmail && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Logged in as: {userEmail}
          </Typography>
        )}
      </Paper>
      
      <Paper elevation={3} sx={{ padding: 4 }}>
        <StocksTable />
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
