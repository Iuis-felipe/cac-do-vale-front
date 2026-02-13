import RefreshCwIcon from '@/assets/icons/refresh-cw.svg?react';
import { SvgIcon } from '@/components';
import { RefreshButtonRoot } from './RefreshButton.styled';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function RefreshButton({ onClick, loading, disabled }: RefreshButtonProps) {
  return (
    <RefreshButtonRoot
      onClick={onClick}
      disabled={disabled || loading}
      variant="contained"
      startIcon={
        <SvgIcon
          icon={RefreshCwIcon}
          sx={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}
        />
      }
    >
      Atualizar
    </RefreshButtonRoot>
  );
}
