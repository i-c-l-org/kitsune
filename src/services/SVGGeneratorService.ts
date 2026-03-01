import type {
  SVGStrategy,
  ISVGGeneratorService,
} from '@/core/interfaces/ISVGStrategy';
import type { CardConfig, ThemeName } from '@/core/interfaces/IThemeStrategy';
import {
  ESTRATEGIA_ESTATISTICAS_GITHUB,
  ESTRATEGIA_LINGUAS_GITHUB,
} from '@/strategies/svg';
class SVGGeneratorServiceImpl implements ISVGGeneratorService {
  private strategies: Map<string, SVGStrategy> = new Map();
  constructor() {
    this.registerDefaults();
  }
  private registerDefaults(): void {
    this.registerStrategy(ESTRATEGIA_ESTATISTICAS_GITHUB);
    this.registerStrategy(ESTRATEGIA_LINGUAS_GITHUB);
  }
  registerStrategy(ESTRATEGIA: SVGStrategy): void {
    this.strategies.set(ESTRATEGIA.type, ESTRATEGIA);
  }
  generate(
    type: string,
    DADOS: unknown,
    username: string,
    config?: CardConfig,
  ): string {
    const ESTRATEGIA = this.strategies.get(type);
    if (!ESTRATEGIA) {
      throw new Error(`SVG strategy '${type}' not found`);
    }
    return ESTRATEGIA.generate(DADOS, username, config);
  }
  generatePreview(
    type: string,
    TEMA: string,
    config?: Partial<CardConfig>,
  ): string {
    const ESTRATEGIA = this.strategies.get(type);
    if (!ESTRATEGIA) {
      throw new Error(`SVG strategy '${type}' not found`);
    }
    return ESTRATEGIA.generatePreview(TEMA, config);
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
export const SERVICO_GERADOR_SVG = new SVGGeneratorServiceImpl();
export { SVGGeneratorServiceImpl };
