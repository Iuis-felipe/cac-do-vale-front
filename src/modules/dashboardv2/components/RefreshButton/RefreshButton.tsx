import { RefreshCw } from 'lucide-react';
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
    >
      <RefreshCw
        size={16}
        style={{
          animation: loading ? 'spin 1s linear infinite' : 'none',
        }}
      />
      Atualizar
    </RefreshButtonRoot>
  );
}
