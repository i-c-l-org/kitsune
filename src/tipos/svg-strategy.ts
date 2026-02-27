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
  theme: ThemeStrategy;
}

export interface SVGStrategy {
  readonly type: string;
  generate(data: unknown, username: string, config?: CardConfig): string;
  generatePreview(theme: string, config?: Partial<CardConfig>): string;
}

export interface ISVGGeneratorService {
  generate(
    type: string,
    data: unknown,
    username: string,
    config?: CardConfig,
  ): string;
  generatePreview(
    type: string,
    theme: string,
    config?: Partial<CardConfig>,
  ): string;
  getAvailableThemes(): string[];
  getAvailableTypes(): string[];
}
