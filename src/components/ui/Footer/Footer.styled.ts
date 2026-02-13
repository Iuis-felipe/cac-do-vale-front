import { Stack, styled, Typography } from "@mui/material";

export const FooterRoot = styled(Stack)({});

export const AplicationName = styled(Typography)(({ theme }) => ({
  background: theme.palette.gradient.blueToGreen,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
}));

// export const Footer
