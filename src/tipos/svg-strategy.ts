/**
 * Tipos relacionados às estratégias de geração de SVG
 */

import type {
  CardConfig,
  ThemeStrategy,
} from '@/core/interfaces/IThemeStrategy';
export interface SVGGenerationContext {
  username: string;
  config: CardConfig;
  TEMA: ThemeStrategy;
}
export interface SVGStrategy {
  readonly type: string;
  generate(DADOS: unknown, username: string, config?: CardConfig): string;
  generatePreview(TEMA: string, config?: Partial<CardConfig>): string;
}
export interface ISVGGeneratorService {
  generate(
    type: string,
    DADOS: unknown,
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
