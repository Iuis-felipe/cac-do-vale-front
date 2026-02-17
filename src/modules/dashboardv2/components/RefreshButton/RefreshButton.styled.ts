import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const RefreshButtonRoot = styled(Button)(({ theme }) => ({
  background: theme.palette.gradient.greenToBlueHorizontal,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 14,
  padding: '8px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:disabled': {
    background: theme.palette.custom.grey.normal,
    color: theme.palette.common.white,
  },
  '&:hover': {
    background: theme.palette.gradient.blueToGreenHorizontal,
    boxShadow: 'none',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));
