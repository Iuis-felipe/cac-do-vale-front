import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

export const GroupRoot = styled(Box)({
  marginBottom: 24,
});

export const GroupHeader = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginBottom: 16,
});

export const GroupDate = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normalActive,
}));

export const GroupCount = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.custom.grey.lightActive,
  backgroundColor: theme.palette.custom.grey.lightHover,
  padding: '2px 8px',
  borderRadius: 12,
}));

export const GroupCards = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));
