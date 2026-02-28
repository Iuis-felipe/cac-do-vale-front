import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const PageTitleRoot = styled(Box)({});

export const PageTitleText = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.custom.grey.normalActive,
}));

export const PageTitleSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.custom.grey.lightActive,
}));
