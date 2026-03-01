import { GitHubStatsStrategy } from './GitHubStatsStrategy';
import { GitHubLangsStrategy } from './GitHubLangsStrategy';
import { VisitorBadgeStrategy } from './VisitorBadgeStrategy';
import { StatusBadgeStrategy } from './StatusBadgeStrategy';

export {
  GitHubStatsStrategy,
  ESTRATEGIA_ESTATISTICAS_GITHUB,
} from './GitHubStatsStrategy';
export {
  GitHubLangsStrategy,
  ESTRATEGIA_LINGUAS_GITHUB,
} from './GitHubLangsStrategy';
export {
  VisitorBadgeStrategy,
  ESTRATEGIA_BADGE_VISITANTE,
} from './VisitorBadgeStrategy';
export {
  StatusBadgeStrategy,
  ESTRATEGIA_BADGE_STATUS,
} from './StatusBadgeStrategy';

// backward-compatible instances used by API handlers
export const githubLangsStrategy = new GitHubLangsStrategy();
export const githubStatsStrategy = new GitHubStatsStrategy();
export const visitorBadgeStrategy = new VisitorBadgeStrategy();
export const statusBadgeStrategy = new StatusBadgeStrategy();
