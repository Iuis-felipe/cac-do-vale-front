import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const DashboardHeaderRoot = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 13,
});

export const HeaderInfo = styled(Box)({});

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normal,
}));

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
}));
