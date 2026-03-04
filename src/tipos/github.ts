/**
 * Tipos relacionados às estatísticas do GitHub
 */

export type GitHubCardTheme =
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
export interface GitHubStats {
  TOTAL_COMMITS: number;
  totalPullRequests: number;
  totalContributions: number;
  followers: number;
  publicRepos: number;
}
export interface GitHubLanguageStat {
  NOME: string;
  VALOR: number;
  PERCENTUAL: number;
  color: string;
}
export interface SVGStyleConfig {
  bgColor?: string;
  borderColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  COR_TEXTO?: string;
  accentColor?: string;
  theme?: GitHubCardTheme;
  // legacy alias
  TEMA?: GitHubCardTheme;
}
export interface GitHubCardBaseConfig extends SVGStyleConfig {
  RAIOS_BORDA?: number;
  MOSTRAR_BORDA?: boolean;
  LARGURA_BORDA?: number;
  LARGURA?: number;
  ALTURA?: number;
}
export interface GitHubCardConfig extends GitHubCardBaseConfig {
  iconStyle?: 'default' | 'outlined' | 'filled';
}
export interface GitHubLangsCardConfig extends GitHubCardBaseConfig {}
export interface GitHubCommonParams {
  theme: GitHubCardTheme;
  // legacy alias
  TEMA?: GitHubCardTheme;
  RAIOS_BORDA?: number;
  MOSTRAR_BORDA?: boolean;
  LARGURA_BORDA?: number;
  LARGURA?: number;
  ALTURA?: number;
  COMPAT_GITHUB?: boolean;
}
export interface GitHubStatsThemeConfig {
  bgGradient: [string, string];
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  COR_TEXTO: string;
  accentGradient: [string, string];
  borderColor: string;
  iconColor: string;
}
export interface GitHubLangsThemeConfig {
  bgGradient: [string, string];
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  COR_TEXTO: string;
  accentGradient: [string, string];
  borderColor: string;
}
