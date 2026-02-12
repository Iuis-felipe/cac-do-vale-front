import { createTheme, PaletteOptions } from '@mui/material/styles';

// Tipos reutilizáveis para as paletas customizadas
type GradientColors = {
  primary: string;
  secondary: string;
  greenToBlue: string;
  blueToGreen: string;
};

type ColorScale = {
  light: string;
  lightHover: string;
  lightActive: string;
  normal: string;
  normalHover: string;
  normalActive: string;
  dark: string;
  darkHover: string;
  darkActive: string;
  darker: string;
};

// Tipos para cores customizadas agrupadas
type CustomColors = {
  blue: ColorScale;
  green: ColorScale;
  grey: ColorScale;
};

// Extend the Theme interface to include custom colors and gradients
declare module '@mui/material/styles' {
  interface Palette {
    gradient: GradientColors;
    custom: CustomColors;
  }

  interface PaletteOptions {
    gradient?: Partial<GradientColors>;
    custom?: Partial<{
      blue?: Partial<ColorScale>;
      green?: Partial<ColorScale>;
      grey?: Partial<ColorScale>;
    }>;
  }
}

// Configuração base do tema (sem modo)
const baseThemeConfig = {
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '48px',
      letterSpacing: 0,
    },
    h2: {
      fontWeight: 400,
      fontSize: '32px',
      letterSpacing: 0,
    },
    body1: {
      fontWeight: 400,
      fontSize: '24px',
      letterSpacing: 0,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '16px',
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '14px',
    },
    button: {
      fontWeight: 500,
      fontSize: '16px',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(5, 227, 234, 0.08)',
        },
      },
    },
  },
};

// Paleta Light Mode
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#05E3EA', // Azul
    contrastText: '#212121',
    light: '#72F3FA',
    dark: '#0097A7',
  },
  secondary: {
    main: '#1DCC66', // Verde
    contrastText: '#fff',
    light: '#81F3B2',
    dark: '#00994D',
  },
  // Cores customizadas do design system
  custom: {
    // Paleta Blue completa
    blue: {
      light: '#E5FAFB',
      lightHover: '#C2F6F8',
      lightActive: '#B2F2F7',
      normal: '#72F3FA',
      normalHover: '#05E3EA',
      normalActive: '#05B6C2',
      dark: '#0097A7',
      darkHover: '#007B8A',
      darkActive: '#005A63',
      darker: '#00363A',
    },
    // Paleta Green completa
    green: {
      light: '#E5FAF0',
      lightHover: '#C2F6DF',
      lightActive: '#B2F7D8',
      normal: '#81F3B2',
      normalHover: '#1DCC66',
      normalActive: '#1DBF5E',
      dark: '#00994D',
      darkHover: '#007A3A',
      darkActive: '#005A2C',
      darker: '#00361A',
    },
    // Paleta Grey customizada
    grey: {
      light: '#F3F2F2',      // Cinza Claríssimo
      lightHover: '#E9E9E9', // Cinza Claro
      lightActive: '#A6A6A6',// Cinza
      normal: '#868686',     // Cinza Médio
      normalHover: '#5A5A5A',// Cinza Médio Escuro
      normalActive: '#212121',// Preto
      dark: '#121212',       // Mais Escuro
      darkHover: '#0B0B0B',  // Quase Preto
      darkActive: '#000000', // Preto Total
      darker: '#000000',     // Preto Total
    },
  },
  background: {
    default: '#F3F2F2',
    paper: '#fff',
  },
  text: {
    primary: '#212121',
    secondary: '#A6A6A6',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #24FF80 0%, #05E3EA 100%)',
    secondary: 'linear-gradient(135deg, #05E3EA 0%, #24FF80 100%)',
    greenToBlue: 'linear-gradient(to right, #24FF80 0%, #05E3EA 100%)',
    blueToGreen: 'linear-gradient(to right, #05E3EA 0%, #24FF80 100%)',
  },
};

// Paleta Dark Mode
const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#05E3EA', // Azul
    contrastText: '#212121',
    light: '#72F3FA',
    dark: '#0097A7',
  },
  secondary: {
    main: '#1DCC66', // Verde
    contrastText: '#fff',
    light: '#81F3B2',
    dark: '#00994D',
  },
  // Cores customizadas do design system
  custom: {
    // Paleta Blue (mesma do light mode - cores funcionam em ambos)
    blue: {
      light: '#E5FAFB',
      lightHover: '#C2F6F8',
      lightActive: '#B2F2F7',
      normal: '#72F3FA',
      normalHover: '#05E3EA',
      normalActive: '#05B6C2',
      dark: '#0097A7',
      darkHover: '#007B8A',
      darkActive: '#005A63',
      darker: '#00363A',
    },
    // Paleta Green (mesma do light mode - cores funcionam em ambos)
    green: {
      light: '#E5FAF0',
      lightHover: '#C2F6DF',
      lightActive: '#B2F7D8',
      normal: '#81F3B2',
      normalHover: '#1DCC66',
      normalActive: '#1DBF5E',
      dark: '#00994D',
      darkHover: '#007A3A',
      darkActive: '#005A2C',
      darker: '#00361A',
    },
    // Paleta Grey customizada invertida para dark mode
    grey: {
      light: '#000000',      // Preto Total
      lightHover: '#0B0B0B', // Quase Preto
      lightActive: '#121212',// Mais Escuro
      normal: '#212121',     // Preto
      normalHover: '#5A5A5A',// Cinza Médio Escuro
      normalActive: '#868686',// Cinza Médio
      dark: '#A6A6A6',       // Cinza
      darkHover: '#E9E9E9',  // Cinza Claro
      darkActive: '#F3F2F2', // Cinza Claríssimo
      darker: '#FFFFFF',     // Branco
    },
  },
  background: {
    default: '#121212',
    paper: '#212121',
  },
  text: {
    primary: '#F3F2F2',
    secondary: '#A6A6A6',
  },
  // Gradientes lineares do design system
  gradient: {
    primary: 'linear-gradient(135deg, #24FF80 0%, #05E3EA 100%)',
    secondary: 'linear-gradient(135deg, #05E3EA 0%, #24FF80 100%)',
    greenToBlue: 'linear-gradient(to right, #24FF80 0%, #05E3EA 100%)',
    blueToGreen: 'linear-gradient(to right, #05E3EA 0%, #24FF80 100%)',
  },
};

// Função para criar tema com paleta customizada opcional
export const createAppTheme = (
  mode: 'light' | 'dark' = 'light',
  customPalette?: Partial<PaletteOptions>
) => {
  // Usa paleta padrão baseada no modo
  const basePalette = mode === 'light' ? lightPalette : darkPalette;

  // Se receber paleta customizada, faz merge preservando o modo
  const finalPalette: PaletteOptions = customPalette
    ? { ...basePalette, ...customPalette, mode }
    : basePalette;

  return createTheme({
    ...baseThemeConfig,
    palette: finalPalette,
  });
};

// Tema padrão (light mode)
const theme = createAppTheme('light');

export default theme;
