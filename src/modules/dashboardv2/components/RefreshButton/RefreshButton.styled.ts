import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const RefreshButtonRoot = styled(Button)(({ theme }) => ({
  background: theme.palette.gradient.greenToBlueHorizontal,
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: 14,
  padding: '8px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  boxShadow: 'none',
  '&:disabled': {
    background: theme.palette.custom.grey.normal,
    color: theme.palette.common.white,
  },
}));
