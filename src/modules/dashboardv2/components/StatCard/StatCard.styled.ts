import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const StatCardRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  border: `1px solid ${theme.palette.grey[100]}`,
  padding: '24px',
  minHeight: 140,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: theme.palette.background.paper,
}));

export const StatCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[500],
  marginBottom: 4,
}));

export const StatCardSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.grey[200],
  marginBottom: 12,
}));

export const StatCardValue = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  fontWeight: 700,
  background: theme.palette.gradient.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  lineHeight: 1.2,
}));

export const StatCardBadge = styled(Box)<{ trend?: 'up' | 'down' }>(({ theme, trend }) => ({
  fontSize: 18,
  fontWeight: 600,
  ...(trend === 'up' ? {
    background: theme.palette.gradient.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } : {
    color: '#EF4444',
  }),
}));

export const StatCardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const StatCardFooter = styled(Box)({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 8,
});
