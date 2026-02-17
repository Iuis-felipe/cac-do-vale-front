import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import { GradientButtonStyled, OutlineButtonStyled } from './ActionButton.styled';

interface ActionButtonProps extends Omit<ButtonProps, 'variant'> {
  children: ReactNode;
}

export function GradientButton({ children, ...props }: ActionButtonProps) {
  return (
    <GradientButtonStyled variant="contained" {...props}>
      {children}
    </GradientButtonStyled>
  );
}

export function OutlineButton({ children, ...props }: ActionButtonProps) {
  return (
    <OutlineButtonStyled variant="outlined" {...props}>
      {children}
    </OutlineButtonStyled>
  );
}
