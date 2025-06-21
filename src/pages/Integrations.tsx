import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddIntegrationDialog from "../components/AddIntegrationDialog";
import api from "../services/axiosInstanceProvider";

interface Integration {
  id: string;
  platform: string;
  lastChangedAt: string;
}

const Integrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const fetchIntegrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/integration");
      setIntegrations(response.data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch integrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleRemoveIntegration = (id: string) => {
    setIntegrations(integrations.filter(integration => integration.id !== id));
  };

  const handleAddIntegration = () => {
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = (added?: boolean) => {
    setIsAddDialogOpen(false);
    if (added) {
      fetchIntegrations();
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Integrations
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddIntegration}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Add Integration
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Platform</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="text.secondary">Loading...</Typography>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="error.main">{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : integrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="text.secondary">
                      No integrations found. Add your first integration to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                integrations.map((integration) => (
                  <TableRow key={integration.id}>
                    <TableCell>{integration.platform}</TableCell>
                    <TableCell>{new Date(integration.lastChangedAt).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleRemoveIntegration(integration.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <AddIntegrationDialog 
          open={isAddDialogOpen} 
          onClose={handleDialogClose} 
        />
      </Container>
    </Box>
  );
};

export default Integrations; 