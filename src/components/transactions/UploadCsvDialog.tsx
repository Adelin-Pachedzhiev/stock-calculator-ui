import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemButton, ListItemText, Typography, Box, Alert, Input } from '@mui/material';

const MOCK_PLATFORMS = [
  {
    name: 'Revolut', 
    steps: [
      'Open your Revolut app.',
      'Select Stocks tab at the top.',
      'Click on the three dots for More.',
      'Select Statements then Account statement.',
      'Select Excel then select the Start and End date to cover all trading history.',
      'Click Get statement and download the statement to your phone.',
      'Upload your file below.',
    ]
  }
];

interface UploadCsvDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File, platform: string) => void;
  error?: string;
  loading?: boolean;
}

const UploadCsvDialog: React.FC<UploadCsvDialogProps> = ({ open, onClose, onUpload, error, loading }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file && selectedPlatform) {
      onUpload(file, selectedPlatform);
    }
  };

  const platformObj = MOCK_PLATFORMS.find(p => p.name === selectedPlatform);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Upload Transactions CSV</DialogTitle>
      <DialogContent>
        {!selectedPlatform ? (
          <>
            <Typography>Select your platform:</Typography>
            <List>
              {MOCK_PLATFORMS.map(platform => (
                <ListItem key={platform.name} disablePadding>
                  <ListItemButton onClick={() => handlePlatformClick(platform.name)}>
                    <ListItemText primary={platform.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <>
            <Typography variant="h6">How to download CSV from {selectedPlatform}:</Typography>
            <Box component="ol" sx={{ pl: 3 }}>
              {platformObj?.steps.map((step, idx) => (
                <li key={idx}><Typography>{step}</Typography></li>
              ))}
            </Box>
            <Box mt={2}>
              <Input type="file" inputProps={{ accept: '.csv' }} onChange={handleFileChange} />
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </>
        )}
      </DialogContent>
      <DialogActions>
        {selectedPlatform ? (
          <>
            <Button onClick={() => setSelectedPlatform(null)} disabled={loading}>Back</Button>
            <Button onClick={handleSubmit} disabled={!file || loading} variant="contained">Submit</Button>
          </>
        ) : (
          <Button onClick={onClose}>Cancel</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UploadCsvDialog; 