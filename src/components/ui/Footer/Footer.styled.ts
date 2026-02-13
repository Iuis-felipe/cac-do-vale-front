import { Stack, styled, Typography } from "@mui/material";

export const FooterRoot = styled(Stack)({
  flexDirection: 'row',
  gap: 16,
  justifyContent: 'space-between',
  paddingTop: 10
});

export const FooterContent = styled(Stack)({
  flexDirection: 'row',
});

export const AplicationName = styled(Typography)(({ theme }) => ({
  background: theme.palette.gradient.blueToGreenHorizontal,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
}));

export const Version = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
}));