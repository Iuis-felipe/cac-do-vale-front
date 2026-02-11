import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const RefreshButtonRoot = styled(Button)(({ theme }) => ({
  background: theme.palette.gradient.greenToBlue,
  color: theme.palette.common.white,
  fontWeight: 500,
  fontSize: 14,
  padding: '10px 20px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
  // TODO: Implementar hover
  },
  '&:disabled': {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.common.white,
  },
}));
