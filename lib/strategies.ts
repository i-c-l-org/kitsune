export { themeRegistry } from '@/strategies/themes';
export type {
  ThemeStrategy,
  ThemeName,
  ThemeColors,
  CardConfig,
} from '@/core/interfaces/IThemeStrategy';
export { svgGeneratorService } from '@/services/SVGGeneratorService';
export {
  githubStatsStrategy,
  githubLangsStrategy,
  visitorBadgeStrategy,
  statusBadgeStrategy,
} from '@/strategies/svg';
export {
  fetchGitHubStats,
  fetchGitHubTopLanguages,
  formatNumber,
} from '@/services/github/github-stats';
export {
  getVisitorsRedis,
  isVisitorsRedisConfigured,
  normalizeVisitorId,
  visitorKey,
} from '@/services/visitors/visitors';
