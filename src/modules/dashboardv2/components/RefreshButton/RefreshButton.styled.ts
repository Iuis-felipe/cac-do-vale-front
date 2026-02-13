import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const RefreshButtonRoot = styled(Button)(({ theme }) => ({
  background: theme.palette.gradient.greenToBlue,
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: 14,
  py: 8,
  px: 21,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  boxShadow: 'none',
  '&:hover': {
    // TODO: Implementar hover
  },
  '&:disabled': {
    backgroundColor: theme.palette.custom.grey.lightActive,
    color: theme.palette.common.white,
  },
}));
