/**
 * Tipos relacionados às estratégias de geração de SVG
 */

import type { CardConfig, ThemeStrategy } from './theme';
import type { GitHubStats, GitHubLanguageStat } from './github';
import type { VisitorBadgeStyleOptions } from './visitor';

export type SVGStrategyPayload =
  | GitHubStats
  | GitHubLanguageStat[]
  | { variant?: string }
  | { label: string; VALOR: string; options?: VisitorBadgeStyleOptions }
  | Record<string, string | number | boolean | undefined>;
export interface SVGGenerationContext {
  username: string;
  config: CardConfig;
  TEMA: ThemeStrategy;
}
export interface SVGStrategy {
  readonly type: string;
  generate(
    DADOS: SVGStrategyPayload,
    username: string,
    config?: CardConfig,
  ): string;
  generatePreview(TEMA: string, config?: Partial<CardConfig>): string;
}
export interface ISVGGeneratorService {
  generate(
    type: string,
    DADOS: SVGStrategyPayload,
    username: string,
    config?: CardConfig,
  ): string;
  generatePreview(
    type: string,
    TEMA: string,
    config?: Partial<CardConfig>,
  ): string;
  getAvailableThemes(): string[];
  getAvailableTypes(): string[];
}
