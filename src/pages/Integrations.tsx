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
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
import AddIntegrationDialog from "../components/integrations/AddIntegrationDialog";
import DeleteIntegrationDialog from "../components/integrations/DeleteIntegrationDialog";
import { getIntegrations, deleteIntegration, syncIntegration, type Integration } from "../services/integrationService";
import ErrorDialog from "../components/common/ErrorDialog";

const Integrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [integrationToDelete, setIntegrationToDelete] = useState<Integration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const theme = useTheme();

  const fetchIntegrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIntegrations();
      setIntegrations(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch integrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleRemoveIntegration = (integration: Integration) => {
    setIntegrationToDelete(integration);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!integrationToDelete) return;
    
    setDeletingId(integrationToDelete.id);
    setError(null);
    try {
      await deleteIntegration(integrationToDelete.id);
      // Refresh the integrations list after successful deletion
      await fetchIntegrations();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete integration");
    } finally {
      setDeletingId(null);
      setIsDeleteDialogOpen(false);
      setIntegrationToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setIntegrationToDelete(null);
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

  const handleSyncIntegration = async (id: string) => {
    setSyncingId(id);
    setError(null);
    try {
      await syncIntegration(id);
      // Optionally, you can refresh integrations or show a success message
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sync integration. Please try again.");
    } finally {
      setSyncingId(null);
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
                <TableCell>Last Sync</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      <Typography color="text.secondary">Loading...</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : integrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="text.secondary">
                      No integrations found. Add your first integration to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                integrations.map((integration) => (
                  <TableRow key={integration.id}>
                    <TableCell>{integration.platform}</TableCell>
                    <TableCell>{new Date(integration.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {integration.lastSyncAt 
                        ? new Date(integration.lastSyncAt).toLocaleString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleRemoveIntegration(integration)}
                        color="error"
                        size="small"
                        disabled={deletingId === integration.id}
                      >
                        {deletingId === integration.id ? (
                          <CircularProgress size={16} />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => handleSyncIntegration(integration.id)}
                        color="primary"
                        size="small"
                        disabled={syncingId === integration.id}
                      >
                        {syncingId === integration.id ? (
                          <CircularProgress size={16} />
                        ) : (
                          <SyncIcon />
                        )}
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

        <DeleteIntegrationDialog
          open={isDeleteDialogOpen}
          integrationPlatform={integrationToDelete?.platform || ""}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Container>
      <ErrorDialog message={error} onClose={() => setError(null)} />
    </Box>
  );
};

export default Integrations; 