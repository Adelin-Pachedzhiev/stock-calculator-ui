import { Box, Paper, Stack, Typography } from "@mui/material";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { exchangeGoogleTokenForJwtToken } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import LinkToken from "../plaid/LinkToken";

const Login = () => {
  const navigate = useNavigate();
  const onSuccessfulLogin = async (credentialResponse: CredentialResponse) => {
    const jwtToken = await exchangeGoogleTokenForJwtToken(
      credentialResponse.credential
    );
    localStorage.setItem("jwtToken", jwtToken);

    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: 380,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight={600}>
            Sign in to your account
          </Typography>

          <Box display="flex" justifyContent="center">
            <GoogleLogin
              onSuccess={onSuccessfulLogin}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
