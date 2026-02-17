import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

export const CardRootStyled = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  border: `2px solid ${theme.palette.custom.grey.lightHover}`,
  padding: '24px',
  background: theme.palette.background.paper,
}));
