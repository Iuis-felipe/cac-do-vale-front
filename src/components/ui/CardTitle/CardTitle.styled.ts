import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const CardTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.custom.grey.normal,
}));
