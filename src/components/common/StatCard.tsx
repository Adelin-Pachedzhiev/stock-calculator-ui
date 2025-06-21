import { Card, CardContent, Typography, Box } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string;
  secondaryValue?: string;
  valueColor?: "success.main" | "error.main" | "text.primary";
}

const StatCard = ({
  title,
  value,
  secondaryValue,
  valueColor = "text.primary",
}: StatCardProps) => {

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        p: 2.5,
        borderRadius: 2,
        boxShadow: "0px 4px 20px -2px rgba(0, 0, 0, 0.06)",
        border: 'none',
      }}
      elevation={0}
    >
      <CardContent
        sx={{
          p: "0 !important",
        }}
      >
        <Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 700 }}
              color={valueColor}
            >
              {value}
            </Typography>
            {secondaryValue && (
              <Typography
                variant="h6"
                sx={{ fontWeight: 500 }}
                color={valueColor}
              >
                {secondaryValue}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard; 