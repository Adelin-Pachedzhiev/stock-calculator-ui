import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./theme/CustomTheme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="565656520042-073n8e4oj9eb5au1q6au0crrgdq6fh07.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
