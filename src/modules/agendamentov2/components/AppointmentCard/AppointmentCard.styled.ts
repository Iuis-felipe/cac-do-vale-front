import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

export const AppointmentCardRoot = styled(Stack)(({ theme }) => ({
  borderRadius: 12,
  border: `2px solid ${theme.palette.custom.grey.lightHover}`,
  padding: 16,
  minWidth: 180,
  maxWidth: 220,
  gap: 8,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.secondary.main,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-2px)',
  },
}));

export const CardName = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normalActive,
  lineHeight: 1.3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

export const CardInfo = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
});

export const CardInfoText = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.custom.grey.lightActive,
}));

export const StatusIndicator = styled(Box)<{ status?: 'confirmed' | 'waiting' | 'cancelled' }>(({ theme, status }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: 4,
  borderRadius: '12px 0 0 12px',
  backgroundColor: status === 'confirmed' 
    ? theme.palette.custom.green.normal 
    : status === 'cancelled'
    ? '#EF4444'
    : theme.palette.custom.blue.normalHover,
}));

export const CardWrapper = styled(Box)({
  position: 'relative',
  paddingLeft: 4,
});
