/**
 * Tipos relacionados às estatísticas do GitHub
 */

export type GitHubCardTheme =
  | 'dark'
  | 'light'
  | 'neon'
  | 'sunset'
  | 'ocean'
  | 'forest';

export interface GitHubStats {
  totalCommits: number;
  totalPullRequests: number;
  totalContributions: number;
  followers: number;
  publicRepos: number;
}

export interface GitHubLanguageStat {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface SVGStyleConfig {
  bgColor?: string;
  borderColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  accentColor?: string;
  theme?: GitHubCardTheme;
}

export interface GitHubCardBaseConfig extends SVGStyleConfig {
  borderRadius?: number;
  showBorder?: boolean;
  borderWidth?: number;
  width?: number;
  height?: number;
}

export interface GitHubCardConfig extends GitHubCardBaseConfig {
  iconStyle?: 'default' | 'outlined' | 'filled';
}

export interface GitHubLangsCardConfig extends GitHubCardBaseConfig {}

export interface GitHubCommonParams {
  theme: GitHubCardTheme;
  borderRadius?: number;
  showBorder?: boolean;
  borderWidth?: number;
  width?: number;
  height?: number;
}

export interface GitHubStatsThemeConfig {
  bgGradient: [string, string];
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  accentGradient: [string, string];
  borderColor: string;
  iconColor: string;
}

export interface GitHubLangsThemeConfig {
  bgGradient: [string, string];
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  accentGradient: [string, string];
  borderColor: string;
}
