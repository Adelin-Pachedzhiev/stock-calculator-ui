import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import Integrations from "./pages/Integrations";
import Portfolio from "./pages/Portfolio";
import AppHeader from "./components/AppHeader";
import { Box } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/integrations" element={<Integrations/>}/>
            <Route path="/portfolio" element={<Portfolio/>}/>
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
