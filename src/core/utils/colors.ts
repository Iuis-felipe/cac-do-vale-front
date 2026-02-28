/**
 * Utilitários para manipulação de cores
 */

/**
 * Converte cor hexadecimal para RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "");
  const isShort = normalized.length === 3;

  if (isShort) {
    const r = parseInt(normalized[0] + normalized[0], 16);
    const g = parseInt(normalized[1] + normalized[1], 16);
    const b = parseInt(normalized[2] + normalized[2], 16);
    return { r, g, b };
  } else if (normalized.length === 6) {
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return { r, g, b };
  }

  return null;
}

/**
 * Calcula a luminância relativa de uma cor (0-1)
 * Baseado na fórmula de percepção humana
 */
export function getLuminance(r: number, g: number, b: number): number {
  // Normaliza valores RGB para 0-1
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  // Fórmula de luminância relativa (WCAG)
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calcula o contraste entre duas cores (1-21)
 * Baseado em WCAG 2.0
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Retorna a melhor cor de texto (preto ou branco) para uma cor de fundo
 * Garante contraste adequado para legibilidade
 * 
 * @param backgroundColor - Cor de fundo em hexadecimal (#RRGGBB ou #RGB)
 * @param darkColor - Cor escura a ser usada (padrão: #111827)
 * @param lightColor - Cor clara a ser usada (padrão: #ffffff)
 * @returns Cor de texto que garante melhor contraste
 */
export function getReadableTextColor(
  backgroundColor: string,
  darkColor: string = "#111827",
  lightColor: string = "#ffffff"
): string {
  const bgRgb = hexToRgb(backgroundColor);

  if (!bgRgb) {
    console.warn(`Cor inválida: ${backgroundColor}`);
    return darkColor;
  }

  const luminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  // WCAG recomenda luminância > 0.5 para usar texto escuro
  // Ajustado para 0.6 para garantir melhor contraste
  return luminance > 0.6 ? darkColor : lightColor;
}

/**
 * Verifica se o contraste entre duas cores atende aos padrões WCAG
 * 
 * @param foreground - Cor do texto
 * @param background - Cor de fundo
 * @param level - Nível WCAG ('AA' ou 'AAA')
 * @param size - Tamanho do texto ('normal' ou 'large')
 * @returns true se atende ao padrão, false caso contrário
 */
export function meetsWCAGStandard(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const contrast = getContrastRatio(foreground, background);

  // Padrões WCAG 2.0
  const standards = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  return contrast >= standards[level][size];
}

/**
 * Escurece uma cor hexadecimal em uma porcentagem
 */
export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = 1 - percent / 100;
  const r = Math.round(rgb.r * factor);
  const g = Math.round(rgb.g * factor);
  const b = Math.round(rgb.b * factor);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Clareia uma cor hexadecimal em uma porcentagem
 */
export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const factor = percent / 100;
  const r = Math.round(rgb.r + (255 - rgb.r) * factor);
  const g = Math.round(rgb.g + (255 - rgb.g) * factor);
  const b = Math.round(rgb.b + (255 - rgb.b) * factor);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Converte RGB para hexadecimal
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Verifica se uma string é uma cor hexadecimal válida
 */
export function isValidHexColor(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}
