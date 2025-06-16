import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { usePlaidLink, type PlaidLinkOptions } from "react-plaid-link";
import api from "../../../services/axiosInstanceProvider";
import ErrorDialog from "../../ErrorDialog";

interface PlaidIntegrationProps {
  onBack: () => void;
  onSuccess?: () => void;
}

const PlaidIntegration = ({ onBack, onSuccess }: PlaidIntegrationProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await api.post("/plaid/link-token");
        setToken(response.data["linkToken"]);
      } catch (err) {
        setError("Failed to fetch link token: " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinkToken();
  }, []);

  const config: PlaidLinkOptions = {
    onSuccess: async (public_token, metadata) => {
      console.log("Plaid Link success", public_token, metadata);
      try {
        await api.post("/plaid/exchange-public-token", { public_token });
        onSuccess?.();
      } catch (error) {
        setError("Failed to exchange public token: " + error);
      }
    },
    onExit: (err, metadata) => {
      console.log("Plaid Link exit", err, metadata);
      onBack();
    },
    token,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (ready && token && !isLoading) {
      open();
    }
  }, [ready, token, isLoading, open]);

  return (
    <Box>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      <ErrorDialog message={error} onClose={() => setError(null)} />
    </Box>
  );
};

export default PlaidIntegration; 