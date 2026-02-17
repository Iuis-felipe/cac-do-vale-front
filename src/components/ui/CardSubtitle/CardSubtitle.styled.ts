import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const CardSubtitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.custom.grey.lightActive,
  lineHeight: 1,
}));
