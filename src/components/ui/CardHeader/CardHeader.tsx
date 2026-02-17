import { BoxProps } from '@mui/material';
import { CardHeaderStyled } from './CardHeader.styled';

export function CardHeader(props: BoxProps) {
  return <CardHeaderStyled {...props} />;
}
