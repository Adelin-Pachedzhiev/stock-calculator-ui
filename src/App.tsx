import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/auth/Login";
import Integrations from "./components/plaid/Integrations";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/integrations" element= {<Integrations/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
