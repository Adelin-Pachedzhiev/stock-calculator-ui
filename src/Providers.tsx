import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/CustomTheme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ApiInterceptor } from "./components/common/ApiInterceptor";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId="565656520042-073n8e4oj9eb5au1q6au0crrgdq6fh07.apps.googleusercontent.com">
        <BrowserRouter>
          <AuthProvider>
            <ApiInterceptor>
              {children}
            </ApiInterceptor>
          </AuthProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
