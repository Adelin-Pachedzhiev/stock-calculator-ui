import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import Integrations from "./pages/Integrations";
import Portfolio from "./pages/Portfolio";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppHeader from "./components/common/AppHeader";
import { Box } from "@mui/material";
import Stock from "./pages/Stock";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const location = useLocation();
  const { isLoggedIn, userRole, isLoading } = useAuth();
  const showHeader = location.pathname !== "/login" && isLoggedIn;

  // Show loading spinner while auth is being determined
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeader && <AppHeader />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              userRole === "ADMIN" ? <AdminDashboard /> : <Portfolio />
            } 
          />
          <Route 
            path="/integrations" 
            element={
              <RoleBasedRoute allowedRoles={['USER']}>
                <Integrations />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/portfolio" 
            element={
              <RoleBasedRoute allowedRoles={['USER']}>
                <Portfolio />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/stock/:symbol" 
            element={
              <RoleBasedRoute allowedRoles={['USER']}>
                <Stock />
              </RoleBasedRoute>
            } 
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
