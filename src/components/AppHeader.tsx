import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("jwtToken")
    // TODO: Implement logout logic
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        {/* Logo/Brand */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Stock Portfolio
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
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
        </Box>

        {/* Settings Button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={() => navigate('/settings')}
          sx={{ mr: 1 }}
        >
          <SettingsIcon />
        </IconButton>

        {/* User Menu */}
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
          <MenuItem onClick={handleSettings}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader; 