export interface ThemeColors {
  bgGradient: [string, string];
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
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
  borderRadius?: number;
  showBorder?: boolean;
  borderWidth?: number;
  width?: number;
  height?: number;
}

export interface ThemeStrategy {
  readonly name: ThemeName;
  readonly colors: ThemeColors;
  getColors(): ThemeColors;
}
