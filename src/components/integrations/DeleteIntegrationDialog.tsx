import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

interface DeleteIntegrationDialogProps {
  open: boolean;
  integrationPlatform: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteIntegrationDialog = ({
  open,
  integrationPlatform,
  onConfirm,
  onCancel,
}: DeleteIntegrationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      aria-labelledby="delete-integration-dialog-title"
    >
      <DialogTitle id="delete-integration-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          <Typography variant="h6">
            Delete Integration
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to delete the <strong>{integrationPlatform}</strong> integration?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This will delete all transactions that were imported from this integration. 
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          autoFocus
        >
          Delete Integration
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteIntegrationDialog;
