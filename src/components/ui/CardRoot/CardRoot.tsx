import { CardProps } from '@mui/material';
import { CardRootStyled } from './CardRoot.styled';

export function CardRoot(props: CardProps) {
  return <CardRootStyled {...props} />;
}
