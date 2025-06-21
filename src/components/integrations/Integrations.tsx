import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import LinkToken from './plaid/LinkToken';

const Integrations = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Integrate Your Bank Account
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Connect your bank account securely using Plaid to enable automatic portfolio tracking and seamless integration.
        </Typography>
        <LinkToken/>
      </Paper>
    </Box>
  );
};

export default Integrations;