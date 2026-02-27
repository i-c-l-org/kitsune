import type {
  SVGStrategy,
  ISVGGeneratorService,
} from '@/core/interfaces/ISVGStrategy';
import type { CardConfig, ThemeName } from '@/core/interfaces/IThemeStrategy';
import { githubStatsStrategy, githubLangsStrategy } from '@/strategies/svg';

class SVGGeneratorServiceImpl implements ISVGGeneratorService {
  private strategies: Map<string, SVGStrategy> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults(): void {
    this.registerStrategy(githubStatsStrategy);
    this.registerStrategy(githubLangsStrategy);
  }

  registerStrategy(strategy: SVGStrategy): void {
    this.strategies.set(strategy.type, strategy);
  }

  generate(
    type: string,
    data: unknown,
    username: string,
    config?: CardConfig,
  ): string {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`SVG strategy '${type}' not found`);
    }
    return strategy.generate(data, username, config);
  }

  generatePreview(
    type: string,
    theme: string,
    config?: Partial<CardConfig>,
  ): string {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`SVG strategy '${type}' not found`);
    }
    return strategy.generatePreview(theme, config);
  }

  getAvailableThemes(): ThemeName[] {
    return [
      'dark',
      'light',
      'neon',
      'sunset',
      'ocean',
      'forest',
      'cyberpunk',
      'aurora',
      'cherry',
      'midnight',
      'dracula',
    ];
  }

  getAvailableTypes(): string[] {
    return Array.from(this.strategies.keys());
  }

  hasStrategy(type: string): boolean {
    return this.strategies.has(type);
  }
}

export const svgGeneratorService = new SVGGeneratorServiceImpl();
export { SVGGeneratorServiceImpl };
