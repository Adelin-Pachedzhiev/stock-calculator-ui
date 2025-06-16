import { Button, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface IntegrationTypeButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const IntegrationTypeButton = ({ onClick, children }: IntegrationTypeButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="outlined"
      size="large"
      onClick={onClick}
      sx={{
        py: 2,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.primary.dark,
          backgroundColor: 'rgba(25, 118, 210, 0.04)',
        }
      }}
    >
      {children}
    </Button>
  );
};

export default IntegrationTypeButton; 