import { styled } from "@mui/material/styles";
import { Box, Typography, Stack } from "@mui/material";

export const GroupRoot = styled(Box)({
  marginBottom: 20,
});

export const GroupHeader = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  marginBottom: 16,
});

export const GroupDate = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normalActive,
}));

export const GroupCount = styled(Typography)(({ theme }) => ({
  fontSize: 10,
  color: theme.palette.custom.grey.lightActive,
}));

interface GroupCardsProps {
  view?: "list" | "grid";
}

export const GroupCards = styled(Box, {
  shouldForwardProp: (prop) => prop !== "view",
})<GroupCardsProps>(({ theme, view = "grid" }) => {
  if (view === "list") {
    return {
      display: "flex",
      flexDirection: "column",
      gap: 16,
    };
  }

  return {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 16,

    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      justifyContent: "center",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      justifyContent: "center",
    },
  };
});
