import { Stack, styled, Typography } from "@mui/material";

export const FooterRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: 16,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 10,
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
}));

export const FooterContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

export const AplicationName = styled(Typography)(({ theme }) => ({
  background: theme.palette.gradient.blueToGreenHorizontal,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "bold",
  whiteSpace: 'nowrap',
}));

export const Version = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.grey.lightActive,
  whiteSpace: 'nowrap',
}));