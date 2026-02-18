import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AppointmentCardRoot = styled(Stack)(({ theme }) => ({
  borderRadius: 12,
  border: `2px solid ${theme.palette.custom.grey.lightHover}`,
  paddingInline: 20,
  paddingBlock: 26,
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
  fontWeight: theme.typography.fontWeightRegular,
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
  fontSize: 14,
  color: theme.palette.custom.grey.normalActive,
  fontWeight: theme.typography.fontWeightRegular,
}));
