import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const GradientButtonStyled = styled(Button)(({ theme }) => ({
  background: theme.palette.gradient.greenToBlueHorizontal,
  color: theme.palette.common.white,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 14,
  padding: '10px 20px',
  borderRadius: 8,
  textTransform: 'none',
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.gradient.blueToGreenHorizontal,
    transform: 'translateY(-1px)',
    boxShadow: 'none',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&:disabled': {
    background: theme.palette.custom.grey.normal,
    color: theme.palette.common.white,
  },
}));

export const OutlineButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.custom.grey.normalActive,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: 14,
  padding: '10px 20px',
  borderRadius: 8,
  border: `1px solid ${theme.palette.custom.grey.lightHover}`,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.custom.grey.lightHover,
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));
