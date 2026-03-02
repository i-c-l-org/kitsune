/**
 * Tipos relacionados aos temas
 */

export interface ThemeColors {
  bgGradient: [string, string];
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  COR_TEXTO: string;
  accentGradient: [string, string];
  borderColor: string;
  iconColor?: string;
}
export type ThemeName =
  | 'dark'
  | 'light'
  | 'neon'
  | 'sunset'
  | 'ocean'
  | 'forest'
  | 'cyberpunk'
  | 'aurora'
  | 'cherry'
  | 'midnight'
  | 'dracula';
export interface CardConfig {
  theme: ThemeName;
  TEMA?: ThemeName;
  RAIOS_BORDA?: number;
  MOSTRAR_BORDA?: boolean;
  LARGURA_BORDA?: number;
  LARGURA?: number;
  ALTURA?: number;
}
export interface ThemeStrategy {
  readonly NOME: ThemeName;
  readonly CORES: ThemeColors;
  getColors(): ThemeColors;
}
