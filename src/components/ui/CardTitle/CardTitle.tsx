import { TypographyProps } from '@mui/material';
import { CardTitleStyled } from './CardTitle.styled';

export function CardTitle(props: TypographyProps) {
  return <CardTitleStyled {...props} />;
}
