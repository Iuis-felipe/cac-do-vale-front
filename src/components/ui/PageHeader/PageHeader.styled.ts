import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

export const PageHeaderRoot = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
});

export const PageHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: 28,
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.custom.grey.normalActive,
}));

export const PageHeaderActions = styled(Box)({
  display: 'flex',
  gap: 12,
});
