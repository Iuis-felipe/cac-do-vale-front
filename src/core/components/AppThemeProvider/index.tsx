import { createContext, useContext, useMemo, useState, ReactNode, useEffect, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, PaletteOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../../../theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  updateCustomPalette: (palette: Partial<PaletteOptions>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface AppThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  customPalette?: Partial<PaletteOptions>;
  persistMode?: boolean; // Salvar preferência no localStorage
}

export const AppThemeProvider = ({
  children,
  defaultMode = 'light',
  customPalette,
  persistMode = true,
}: AppThemeProviderProps) => {
  // Recuperar modo salvo do localStorage se habilitado
  const getInitialMode = (): ThemeMode => {
    if (persistMode && typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
      if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode;
      }
    }
    return defaultMode;
  };

  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [externalPalette, setExternalPalette] = useState<Partial<PaletteOptions> | undefined>(customPalette);

  // Salvar modo no localStorage quando mudar
  useEffect(() => {
    if (persistMode && typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode);
    }
  }, [mode, persistMode]);

  // Atualizar paleta externa quando prop mudar
  useEffect(() => {
    if (customPalette) {
      setExternalPalette(customPalette);
    }
  }, [customPalette]);

  const toggleMode = useCallback(() => {
    setModeState((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  const updateCustomPalette = useCallback((palette: Partial<PaletteOptions>) => {
    setExternalPalette((prev) => ({
      ...prev,
      ...palette,
    }));
  }, []);

  // Criar tema com configurações atuais
  const theme = useMemo(() => {
    return createAppTheme(mode, externalPalette);
  }, [mode, externalPalette]);

  const contextValue: ThemeContextType = useMemo(() => ({
    mode,
    toggleMode,
    setMode,
    updateCustomPalette,
  }), [mode, toggleMode, setMode, updateCustomPalette]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook para usar o contexto de tema
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme deve ser usado dentro de AppThemeProvider');
  }
  return context;
};

export default AppThemeProvider;
