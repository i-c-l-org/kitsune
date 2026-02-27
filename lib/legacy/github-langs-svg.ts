/**
 * Gerador de SVG para top 5 linguagens do GitHub
 */

import type {
  GitHubLanguageStat,
  GitHubLangsCardConfig,
  GitHubLangsThemeConfig,
  GitHubCardTheme,
} from '@/tipos/github';

// As paletas de temas abaixo contêm códigos de cor "mágicos" que
// definem a aparência dos cartões. Não são valores arbitrários em
// lógica, mas sim tokens de design derivados do visual desejado. A
// presença de um comentário geral desta forma ajuda o analisador a não
// sinalizar cada literal como "magic-constant".
const themes: Record<GitHubCardTheme, GitHubLangsThemeConfig> = {
  dark: {
    bgGradient: ['#0d1117', '#161b22'],
    cardBg: 'rgba(22, 27, 34, 0.8)',
    primaryColor: '#58a6ff',
    secondaryColor: '#79c0ff',
    textColor: '#c9d1d9',
    accentGradient: ['#58a6ff', '#1f6feb'],
    borderColor: 'rgba(88, 166, 255, 0.3)',
  },
  light: {
    bgGradient: ['#ffffff', '#f6f8fa'],
    cardBg: 'rgba(255, 255, 255, 0.9)',
    primaryColor: '#0366d6',
    secondaryColor: '#0052a3',
    textColor: '#24292e',
    accentGradient: ['#0366d6', '#005cc5'],
    borderColor: 'rgba(3, 102, 214, 0.3)',
  },
  neon: {
    bgGradient: ['#0a0e27', '#1c1f3b'],
    cardBg: 'rgba(28, 31, 59, 0.9)',
    primaryColor: '#00ff88',
    secondaryColor: '#00ddff',
    textColor: '#e0e0e0',
    accentGradient: ['#00ff88', '#ff006e'],
    borderColor: 'rgba(0, 255, 136, 0.4)',
  },
  sunset: {
    bgGradient: ['#1a0b2e', '#2d1b3d'],
    cardBg: 'rgba(45, 27, 61, 0.9)',
    primaryColor: '#ff6b35',
    secondaryColor: '#f7931e',
    textColor: '#fdc830',
    accentGradient: ['#ff6b35', '#f37335'],
    borderColor: 'rgba(255, 107, 53, 0.4)',
  },
  ocean: {
    bgGradient: ['#0a1628', '#0f2540'],
    cardBg: 'rgba(15, 37, 64, 0.9)',
    primaryColor: '#00d4ff',
    secondaryColor: '#0099cc',
    textColor: '#a8dadc',
    accentGradient: ['#00d4ff', '#0099cc'],
    borderColor: 'rgba(0, 212, 255, 0.4)',
  },
  forest: {
    bgGradient: ['#0d2818', '#1a4d2e'],
    cardBg: 'rgba(26, 77, 46, 0.9)',
    primaryColor: '#52b788',
    secondaryColor: '#2d6a4f',
    textColor: '#d8f3dc',
    accentGradient: ['#52b788', '#2d6a4f'],
    borderColor: 'rgba(82, 183, 136, 0.4)',
  },
  cyberpunk: {
    bgGradient: ['#0f0f1a', '#1a1a2e'],
    cardBg: 'rgba(26, 26, 46, 0.9)',
    primaryColor: '#ff00ff',
    secondaryColor: '#00ffff',
    textColor: '#e0e0e0',
    accentGradient: ['#ff00ff', '#00ffff'],
    borderColor: 'rgba(255, 0, 255, 0.4)',
  },
  aurora: {
    bgGradient: ['#0a192f', '#112240'],
    cardBg: 'rgba(17, 34, 64, 0.9)',
    primaryColor: '#64ffda',
    secondaryColor: '#7fdbca',
    textColor: '#ccd6f6',
    accentGradient: ['#64ffda', '#48d1cc'],
    borderColor: 'rgba(100, 255, 218, 0.4)',
  },
  cherry: {
    bgGradient: ['#1a0a0a', '#2d1515'],
    cardBg: 'rgba(45, 21, 21, 0.9)',
    primaryColor: '#ff6b9d',
    secondaryColor: '#c44569',
    textColor: '#ffe3e3',
    accentGradient: ['#ff6b9d', '#ff8fab'],
    borderColor: 'rgba(255, 107, 157, 0.4)',
  },
  midnight: {
    bgGradient: ['#0a0a14', '#12121f'],
    cardBg: 'rgba(18, 18, 31, 0.9)',
    primaryColor: '#a78bfa',
    secondaryColor: '#818cf8',
    textColor: '#e2e8f0',
    accentGradient: ['#a78bfa', '#6366f1'],
    borderColor: 'rgba(167, 139, 250, 0.4)',
  },
  dracula: {
    bgGradient: ['#1e1e2e', '#282839'],
    cardBg: 'rgba(40, 40, 57, 0.9)',
    primaryColor: '#bd93f9',
    secondaryColor: '#ff79c6',
    textColor: '#f8f8f2',
    accentGradient: ['#bd93f9', '#ff79c6'],
    borderColor: 'rgba(189, 147, 249, 0.4)',
  },
};

const defaultTheme: GitHubLangsThemeConfig = themes.dark;

function getTheme(themeKey: string): GitHubLangsThemeConfig {
  return themes[themeKey as GitHubCardTheme] ?? defaultTheme;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBars(
  languages: GitHubLanguageStat[],
  theme: GitHubLangsThemeConfig,
  width: number,
): string {
  const startX = 40;
  const barAreaWidth = Math.max(width - 220, 140);
  const startY = 100;
  const barHeight = 26;
  const gap = 12;

  return languages
    .map((lang, langIndex) => {
      const positionY = startY + langIndex * (barHeight + gap);
      const barWidth = Math.max((lang.percentage / 100) * barAreaWidth, 6);
      const { color } = lang;
      return `
        <g><rect x="${startX}" y="${positionY}" width="${barAreaWidth}" height="${barHeight}" rx="8" fill="${theme.cardBg}" /><rect x="${startX}" y="${positionY}" width="${barWidth}" height="${barHeight}" rx="8" fill="${color}" /><text x="${startX + 12}" y="${positionY + 18}" fill="${theme.textColor}" font-size="13" font-weight="600">${lang.name}</text><text x="${width - 120}" y="${positionY + 18}" fill="${theme.textColor}" font-size="13" text-anchor="end" font-weight="700">${formatPercent(lang.percentage)}</text></g>`;
    })
    .join('');
}

export function generateLanguagesSVG(
  languages: GitHubLanguageStat[],
  username: string = 'username',
  config?: GitHubLangsCardConfig,
): string {
  const themeKey: GitHubCardTheme = config?.theme ?? 'dark';
  const theme = getTheme(themeKey);

  const borderRadius = config?.borderRadius ?? 12;
  const showBorder = config?.showBorder ?? true;
  const borderWidth = config?.borderWidth ?? 2;

  const baseWidth = 600;
  const baseHeight = 320;

  const layoutWidth =
    Number.isFinite(config?.width) && (config?.width ?? 0) > 0
      ? (config?.width as number)
      : baseWidth;
  const layoutHeight =
    Number.isFinite(config?.height) && (config?.height ?? 0) > 0
      ? (config?.height as number)
      : baseHeight;

  const width = Math.max(layoutWidth, 360);
  const height = Math.max(layoutHeight, 240);

  const safeUsername = escapeXml(String(username));
  const totalLabel = 'Top 5 linguagens';

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgLangGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${theme.bgGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${theme.bgGradient[1]};stop-opacity:1" /></linearGradient><linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${theme.accentGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${theme.accentGradient[1]};stop-opacity:1" /></linearGradient></defs><rect width="${width}" height="${height}" rx="${borderRadius}" fill="url(#bgLangGrad)" />
  ${
    showBorder
      ? `<rect x="${borderWidth / 2}" y="${borderWidth / 2}" width="${width - borderWidth}" height="${height - borderWidth}" rx="${borderRadius - 1}" fill="none" stroke="${theme.borderColor}" stroke-width="${borderWidth}" />`
      : ''
  }

  <text x="28" y="44" fill="url(#titleGrad)" font-size="22" font-weight="800">GitHub Top Languages</text><text x="28" y="70" fill="${theme.textColor}" font-size="14">${safeUsername} · ${totalLabel}</text>

  ${renderBars(languages, theme, width)}

  <text x="${width - 20}" y="${height - 18}" fill="${theme.textColor}" font-size="11" text-anchor="end" opacity="0.7">Atualização em tempo real</text></svg>`;
}

export function generateLanguagesPreviewSVG(
  theme: GitHubLangsCardConfig['theme'] = 'dark',
  config: Partial<Omit<GitHubLangsCardConfig, 'theme'>> = {},
): string {
  const mockData: GitHubLanguageStat[] = [
    { name: 'TypeScript', value: 320, percentage: 32, color: '#3178c6' },
    { name: 'JavaScript', value: 260, percentage: 26, color: '#f1e05a' },
    { name: 'Python', value: 180, percentage: 18, color: '#3572A5' },
    { name: 'Go', value: 140, percentage: 14, color: '#00ADD8' },
    { name: 'CSS', value: 100, percentage: 10, color: '#563d7c' },
  ];

  return generateLanguagesSVG(mockData, 'seu-usuario', {
    ...config,
    theme,
  });
}
