import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import IntegrationTypeButton from "./IntegrationTypeButton";
import Trading212Form from "./trading212/Trading212Form";
import PlaidIntegration from "./plaid/PlaidIntegration";

type IntegrationType = 'trading' | 'plaid' | null;

interface AddIntegrationDialogProps {
  open: boolean;
  onClose: (added?: boolean) => void;
  onAdded?: () => void;
}

const AddIntegrationDialog = ({ open, onClose }: AddIntegrationDialogProps) => {
  const [selectedType, setSelectedType] = useState<IntegrationType>(null);

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  const handleTradingSubmit = (token: string) => {
    // TODO: Implement Trading212 integration
    console.log("Trading212 token:", token);
    onClose(true); // Indicate integration was added
    setSelectedType(null);
  };

  const handlePlaidSuccess = () => {
    // TODO: Handle successful Plaid integration
    console.log("Plaid integration successful");
    onClose(true); // Indicate integration was added
    setSelectedType(null);
  };

  const renderContent = () => {
    if (!selectedType) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <IntegrationTypeButton onClick={() => setSelectedType('trading')}>
            Connect Trading212 Account
          </IntegrationTypeButton>
          <IntegrationTypeButton onClick={() => setSelectedType('plaid')}>
            Connect To Investments Platform using Plaid
          </IntegrationTypeButton>
        </Box>
      );
    }

    if (selectedType === 'trading') {
      return (
        <Trading212Form
          onSubmit={handleTradingSubmit}
          onBack={() => setSelectedType(null)}
        />
      );
    }

    return (
      <PlaidIntegration 
        onBack={() => setSelectedType(null)}
        onSuccess={handlePlaidSuccess}
      />
    );
  };

  const getDialogTitle = () => {
    switch (selectedType) {
      case 'trading':
        return 'Connect Trading212 Account';
      case 'plaid':
        return 'Connect your investment platform';
      default:
        return 'Add Integration';
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      aria-labelledby="add-integration-dialog-title"
    >
      <DialogTitle id="add-integration-dialog-title">
        <Typography variant="h6">
          {getDialogTitle()}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AddIntegrationDialog; 