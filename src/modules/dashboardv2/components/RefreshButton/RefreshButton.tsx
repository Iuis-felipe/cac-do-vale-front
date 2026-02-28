import RefreshCwIcon from '@/assets/icons/refresh-cw.svg?react';
import { SvgIcon, GradientButton } from '@/components';

interface RefreshButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function RefreshButton({ onClick, loading, disabled }: RefreshButtonProps) {
  return (
    <GradientButton
      onClick={onClick}
      disabled={disabled || loading}
      startIcon={
        <SvgIcon
          icon={RefreshCwIcon}
          sx={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}
        />
      }
    >
      Atualizar
    </GradientButton>
  );
}
