import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Integrations from "./pages/Integrations";
import Portfolio from "./pages/Portfolio";
import AppHeader from "./components/common/AppHeader";
import { Box } from "@mui/material";
import Stock from "./pages/Stock";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppHeader />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/integrations" element={<Integrations/>}/>
            <Route path="/portfolio" element={<Portfolio/>}/>
            <Route path="/stock/:symbol" element={<Stock />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
