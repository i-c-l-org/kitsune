import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type { CardConfig, ThemeColors } from "@/core/interfaces/IThemeStrategy";
import { themeRegistry } from "@/strategies/themes";

interface GitHubLanguageStat {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderBars(
  languages: GitHubLanguageStat[],
  colors: ThemeColors,
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
      return `<g>
        <rect x="${startX}" y="${positionY}" width="${barAreaWidth}" height="${barHeight}" rx="8" fill="${colors.cardBg}" />
        <rect x="${startX}" y="${positionY}" width="${barWidth}" height="${barHeight}" rx="8" fill="${lang.color}" />
        <text x="${startX + 12}" y="${positionY + 18}" fill="${colors.textColor}" font-size="13" font-weight="600">${lang.name}</text>
        <text x="${width - 120}" y="${positionY + 18}" fill="${colors.textColor}" font-size="13" text-anchor="end" font-weight="700">${formatPercent(lang.percentage)}</text>
      </g>`;
    })
    .join("");
}

export class GitHubLangsStrategy implements SVGStrategy {
  readonly type = "github-langs";

  generate(data: unknown, username: string, config?: CardConfig): string {
    const languages = data as GitHubLanguageStat[];
    const themeKey = config?.theme ?? "dark";
    const theme = themeRegistry.get(themeKey);
    const colors = theme.getColors();

    const borderRadius = config?.borderRadius ?? 12;
    const showBorder = config?.showBorder ?? true;
    const borderWidth = config?.borderWidth ?? 2;

    const baseWidth = 600;
    const baseHeight = 320;

    const width = Math.max(config?.width ?? baseWidth, 360);
    const height = Math.max(config?.height ?? baseHeight, 240);

    const safeUsername = escapeXml(username);
    const totalLabel = "Top 5 linguagens";

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bgLangGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${colors.bgGradient[0]};stop-opacity:1" />
    <stop offset="100%" style="stop-color:${colors.bgGradient[1]};stop-opacity:1" />
  </linearGradient>
  <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:${colors.accentGradient[0]};stop-opacity:1" />
    <stop offset="100%" style="stop-color:${colors.accentGradient[1]};stop-opacity:1" />
  </linearGradient>
</defs>

<rect width="${width}" height="${height}" rx="${borderRadius}" fill="url(#bgLangGrad)" />
${showBorder ? `<rect x="${borderWidth / 2}" y="${borderWidth / 2}" width="${width - borderWidth}" height="${height - borderWidth}" rx="${borderRadius - 1}" fill="none" stroke="${colors.borderColor}" stroke-width="${borderWidth}" />` : ""}

<text x="28" y="44" fill="url(#titleGrad)" font-size="22" font-weight="800">GitHub Top Languages</text>
<text x="28" y="70" fill="${colors.textColor}" font-size="14">${safeUsername} · ${totalLabel}</text>

${renderBars(languages, colors, width)}

<text x="${width - 20}" y="${height - 18}" fill="${colors.textColor}" font-size="11" text-anchor="end" opacity="0.7">Atualização em tempo real</text>
</svg>`;
  }

  generatePreview(theme: string, config?: Partial<CardConfig>): string {
    const mockData: GitHubLanguageStat[] = [
      { name: "TypeScript", value: 320, percentage: 32, color: "#3178c6" },
      { name: "JavaScript", value: 260, percentage: 26, color: "#f1e05a" },
      { name: "Python", value: 180, percentage: 18, color: "#3572A5" },
      { name: "Go", value: 140, percentage: 14, color: "#00ADD8" },
      { name: "CSS", value: 100, percentage: 10, color: "#563d7c" },
    ];
    const themeKey = theme as CardConfig["theme"];
    return this.generate(mockData, "seu-usuario", {
      theme: themeKey,
      ...config,
    });
  }
}

export const githubLangsStrategy = new GitHubLangsStrategy();
