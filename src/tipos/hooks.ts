/**
 * Tipos relacionados aos hooks
 */

export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
  rank: string;
}

export interface UseGitHubStatsOptions {
  username: string;
  theme?: string;
  width?: string;
  height?: string;
  enabled?: boolean;
}

export interface GitHubLanguageStat {
  name: string;
  color: string;
  size: number;
  percent: number;
}

export interface UseGitHubLangsOptions {
  username: string;
  theme?: string;
  width?: string;
  height?: string;
  enabled?: boolean;
}
