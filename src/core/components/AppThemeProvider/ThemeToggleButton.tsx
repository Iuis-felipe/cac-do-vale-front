import { IconButton, Tooltip } from '@mui/material';
import { Moon, Sun } from 'lucide-react';
import { useAppTheme } from './index';

/**
 * Componente Toggle para alternar entre Light e Dark Mode
 * Pode ser usado em qualquer lugar da aplicação
 */
export const ThemeToggleButton = () => {
  const { mode, toggleMode } = useAppTheme();

  return (
    <Tooltip title={`Alternar para modo ${mode === 'light' ? 'escuro' : 'claro'}`}>
      <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
        {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
