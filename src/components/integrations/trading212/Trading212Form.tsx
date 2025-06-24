import { Box, Button, DialogActions, TextField, useTheme } from "@mui/material";
import { postTrading212Token } from "../../../services/trading212Service";

interface Trading212FormProps {
  onSubmit: (token: string) => void;
  onBack: () => void;
}

const Trading212Form = ({ onSubmit, onBack }: Trading212FormProps) => {
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const secret = formData.get('token') as string;
    await postTrading212Token(secret);
    
    onSubmit(secret);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        name="token"
        label="Trading212 Token"
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