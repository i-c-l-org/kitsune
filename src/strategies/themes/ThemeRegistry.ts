import type {
  ThemeStrategy,
  ThemeName,
  ThemeColors,
} from '@/core/interfaces/IThemeStrategy';
const DEFINICOES_DE_TEMA: Record<ThemeName, ThemeColors> = {
  dark: {
    bgGradient: ['#0d1117', '#161b22'],
    cardBg: 'rgba(22, 27, 34, 0.8)',
    primaryColor: '#58a6ff',
    secondaryColor: '#79c0ff',
    COR_TEXTO: '#c9d1d9',
    accentGradient: ['#58a6ff', '#1f6feb'],
    borderColor: 'rgba(88, 166, 255, 0.3)',
    iconColor: '#58a6ff',
  },
  light: {
    bgGradient: ['#ffffff', '#f6f8fa'],
    cardBg: 'rgba(255, 255, 255, 0.9)',
    primaryColor: '#0366d6',
    secondaryColor: '#0052a3',
    COR_TEXTO: '#24292e',
    accentGradient: ['#0366d6', '#005cc5'],
    borderColor: 'rgba(3, 102, 214, 0.3)',
    iconColor: '#0366d6',
  },
  neon: {
    bgGradient: ['#0a0e27', '#1c1f3b'],
    cardBg: 'rgba(28, 31, 59, 0.9)',
    primaryColor: '#00ff88',
    secondaryColor: '#00ddff',
    COR_TEXTO: '#e0e0e0',
    accentGradient: ['#00ff88', '#ff006e'],
    borderColor: 'rgba(0, 255, 136, 0.4)',
    iconColor: '#00ff88',
  },
  sunset: {
    bgGradient: ['#1a0b2e', '#2d1b3d'],
    cardBg: 'rgba(45, 27, 61, 0.9)',
    primaryColor: '#ff6b35',
    secondaryColor: '#f7931e',
    COR_TEXTO: '#fdc830',
    accentGradient: ['#ff6b35', '#f37335'],
    borderColor: 'rgba(255, 107, 53, 0.4)',
    iconColor: '#ff6b35',
  },
  ocean: {
    bgGradient: ['#0a1628', '#0f2540'],
    cardBg: 'rgba(15, 37, 64, 0.9)',
    primaryColor: '#00d4ff',
    secondaryColor: '#0099cc',
    COR_TEXTO: '#a8dadc',
    accentGradient: ['#00d4ff', '#0099cc'],
    borderColor: 'rgba(0, 212, 255, 0.4)',
    iconColor: '#00d4ff',
  },
  forest: {
    bgGradient: ['#0d2818', '#1a4d2e'],
    cardBg: 'rgba(26, 77, 46, 0.9)',
    primaryColor: '#52b788',
    secondaryColor: '#2d6a4f',
    COR_TEXTO: '#d8f3dc',
    accentGradient: ['#52b788', '#2d6a4f'],
    borderColor: 'rgba(82, 183, 136, 0.4)',
    iconColor: '#52b788',
  },
  cyberpunk: {
    bgGradient: ['#0f0f1a', '#1a1a2e'],
    cardBg: 'rgba(26, 26, 46, 0.9)',
    primaryColor: '#ff00ff',
    secondaryColor: '#00ffff',
    COR_TEXTO: '#e0e0e0',
    accentGradient: ['#ff00ff', '#00ffff'],
    borderColor: 'rgba(255, 0, 255, 0.4)',
    iconColor: '#ff00ff',
  },
  aurora: {
    bgGradient: ['#0a192f', '#112240'],
    cardBg: 'rgba(17, 34, 64, 0.9)',
    primaryColor: '#64ffda',
    secondaryColor: '#7fdbca',
    COR_TEXTO: '#ccd6f6',
    accentGradient: ['#64ffda', '#48d1cc'],
    borderColor: 'rgba(100, 255, 218, 0.4)',
    iconColor: '#64ffda',
  },
  cherry: {
    bgGradient: ['#1a0a0a', '#2d1515'],
    cardBg: 'rgba(45, 21, 21, 0.9)',
    primaryColor: '#ff6b9d',
    secondaryColor: '#c44569',
    COR_TEXTO: '#ffe3e3',
    accentGradient: ['#ff6b9d', '#ff8fab'],
    borderColor: 'rgba(255, 107, 157, 0.4)',
    iconColor: '#ff6b9d',
  },
  midnight: {
    bgGradient: ['#0a0a14', '#12121f'],
    cardBg: 'rgba(18, 18, 31, 0.9)',
    primaryColor: '#a78bfa',
    secondaryColor: '#818cf8',
    COR_TEXTO: '#e2e8f0',
    accentGradient: ['#a78bfa', '#6366f1'],
    borderColor: 'rgba(167, 139, 250, 0.4)',
    iconColor: '#a78bfa',
  },
  dracula: {
    bgGradient: ['#1e1e2e', '#282839'],
    cardBg: 'rgba(40, 40, 57, 0.9)',
    primaryColor: '#bd93f9',
    secondaryColor: '#ff79c6',
    COR_TEXTO: '#f8f8f2',
    accentGradient: ['#bd93f9', '#ff79c6'],
    borderColor: 'rgba(189, 147, 249, 0.4)',
    iconColor: '#bd93f9',
  },
};
class ThemeStrategyImpl implements ThemeStrategy {
  constructor(
    public readonly NOME: ThemeName,
    public readonly CORES: ThemeColors,
  ) {}
  getColors(): ThemeColors {
    return this.CORES;
  }
}
class ThemeRegistry {
  private strategies: Map<ThemeName, ThemeStrategy> = new Map();
  constructor() {
    this.registerDefaults();
  }
  private registerDefaults(): void {
    (Object.keys(DEFINICOES_DE_TEMA) as ThemeName[]).forEach((NOME) => {
      this.register(new ThemeStrategyImpl(NOME, DEFINICOES_DE_TEMA[NOME]));
    });
  }
  register(ESTRATEGIA: ThemeStrategy): void {
    this.strategies.set(ESTRATEGIA.NOME, ESTRATEGIA);
  }
  get(themeName: ThemeName): ThemeStrategy {
    const ESTRATEGIA = this.strategies.get(themeName);
    if (!ESTRATEGIA) {
      console.warn(`Theme '${themeName}' not found, using 'dark' as fallback`);
      return this.get('dark');
    }
    return ESTRATEGIA;
  }
  getAll(): ThemeStrategy[] {
    return Array.from(this.strategies.values());
  }
  getThemeNames(): ThemeName[] {
    return Array.from(this.strategies.keys());
  }
  has(themeName: string): boolean {
    return this.strategies.has(themeName as ThemeName);
  }
}
export const REGISTRO_DE_TEMAS = new ThemeRegistry();
export { ThemeStrategy, DEFINICOES_DE_TEMA };
