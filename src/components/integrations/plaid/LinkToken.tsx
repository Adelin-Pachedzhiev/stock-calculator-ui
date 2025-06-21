import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { usePlaidLink, type PlaidLinkOptions } from "react-plaid-link";
import api from "../../../services/axiosInstanceProvider";
import ErrorDialog from "../../ErrorDialog";

const LinkToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      await api
        .post("/plaid/link-token")
        .then((response) => setToken(response.data["linkToken"]))
        .catch((err) => {
          setError("Failed to fetch link token: " + err);
        });
    };

    fetchLinkToken();
  }, []);

  const config: PlaidLinkOptions = {
    onSuccess: async (public_token, metadata) => {
      console.log("Plaid Link success", public_token, metadata);
      try {
        await api.post("/plaid/exchange-public-token", { public_token });
        // Optionally, handle success (e.g., show a message or update state)
      } catch (error) {
        setError("Failed to exchange public token: " + error);
      }
    },
    onExit: (err, metadata) => {
      console.log("Plaid Link exit", err, metadata);
    },
    token,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <>
      <Typography>{token ? `Token is ${token}` : ""}</Typography>

      <Button onClick={() => open()} disabled={!ready}>
        Open Plaid Link
      </Button>

      <ErrorDialog message={error} onClose={() => setError(null)} />
    </>
  );
};

export default LinkToken;
