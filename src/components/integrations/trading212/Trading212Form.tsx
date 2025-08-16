import { Box, Button, DialogActions, TextField, useTheme, Typography, Link } from "@mui/material";
import { postTrading212Token } from "../../../services/trading212Service";

interface Trading212FormProps {
  onSubmit: (token: string) => void;
  onBack: () => void;
}

const Trading212Form = ({ onSubmit, onBack }: Trading212FormProps) => {
  const theme = useTheme();

  const steps = [
    "Log into your Trading212 account",
    "Go to Settings → API (Beta)",
    "Generate a new API key with read permissions",
    "Copy the token and paste it below"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const secret = formData.get('token') as string;
    await postTrading212Token(secret);
    
    onSubmit(secret);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          How to get your Trading212 API Token:
        </Typography>
        {steps.map((step, index) => (
          <Typography key={index} variant="body2" sx={{ mb: 1 }}>
            {index + 1}. {step}
          </Typography>
        ))}
        <Typography variant="caption" color="text.secondary">
          For more information, visit{' '}
          <Link 
            href="https://helpcentre.trading212.com/hc/en-us/articles/14584770928157-How-can-I-generate-an-API-key" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Trading212 documentation
          </Link>
        </Typography>
      </Box>
      <TextField
        name="token"
        label="API Token"
        required
        fullWidth
        sx={{ mb: 2 }}
        helperText="Enter your Trading212 API token"
      />
      <DialogActions sx={{ px: 0 }}>
        <Button onClick={onBack} color="inherit">
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            }
          }}
        >
          Connect
        </Button>
      </DialogActions>
    </Box>
  );
};

export default Trading212Form; 