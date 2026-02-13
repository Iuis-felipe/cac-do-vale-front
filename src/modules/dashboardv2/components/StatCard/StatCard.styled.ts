import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

export const StatCardRoot = styled(Stack)(({ theme }) => ({
  borderRadius: 20,
  border: `2px solid ${theme.palette.custom.grey.lightHover}`,
  padding: 20,
  minHeight: 185,
  minWidth: 366,
  justifyContent: 'space-between',
  background: theme.palette.background.paper,
}));

export const StatCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normal,
}));

export const StatCardSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
}));

export const StatCardValue = styled(Typography)(({ theme }) => ({
  fontSize: 64,
  fontWeight: theme.typography.fontWeightMedium,
  background: theme.palette.gradient.greenToBlueVertical,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1,
}));

export const StatCardBadge = styled(Box)<{ trend?: 'up' | 'down' }>(({ theme, trend }) => ({
  fontSize: 18,
  fontWeight: theme.typography.fontWeightMedium,
  ...(trend === 'up' ? {
    background: theme.palette.gradient.greenToBlueHorizontal,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } : {
    color: '#EF4444',
  }),
}));

export const StatCardContainer = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const StatCardHeader = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 10,
  width: '100%',
});

export const StatCardFooter = styled(Stack)({
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 8,
});
