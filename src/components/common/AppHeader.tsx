import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, Autocomplete, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAvailableStocks } from '../../services/stockService';
import { useAuth } from '../../contexts/AuthContext';
import type { StockInfo } from '../../types/stock';

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stocks, setStocks] = useState<StockInfo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    getAvailableStocks().then(setStocks).catch(() => setStocks([]));
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo/Brand */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, cursor: 'pointer', mr: 2 }}
          onClick={() => navigate('/')}
        >
          Stock Portfolio
        </Typography>

        {/* Centered Search Bar */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Autocomplete
            sx={{
              width: 350,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
              '& .MuiInputBase-root': {
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 1,
              },
            }}
            options={stocks}
            getOptionLabel={(option) => `${option.name} (${option.symbol})`}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            value={null}
            onChange={(_, value) => {
              if (value) {
                navigate(`/stock/${value.symbol}`);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search Stocks" variant="outlined" size="small" />
            )}
            filterOptions={(options, { inputValue }) =>
              options.filter(
                (option) =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                  option.symbol.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
          />
        </Box>

        {/* Navigation Links and User Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/portfolio')}
          >
            Portfolio
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/integrations')}
          >
            Integrations
          </Button>
          {isLoggedIn && (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader; 