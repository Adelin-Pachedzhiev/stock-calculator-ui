import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  shape: { borderRadius: 12 },
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 1200, borderRadius: 8 },
      },
    },
  },
});

export default theme;