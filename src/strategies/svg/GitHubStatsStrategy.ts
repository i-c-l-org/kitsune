import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type { CardConfig } from "@/core/interfaces/IThemeStrategy";
import { themeRegistry } from "@/strategies/themes";

interface GitHubStats {
  totalCommits: number;
  totalPullRequests: number;
  totalContributions: number;
  followers: number;
  publicRepos: number;
}

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return value.toString();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const icons = {
  commits: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>`,
  pullRequests: `<path d="M7.5 3.5C7.5 4.88 6.38 6 5 6s-2.5-1.12-2.5-2.5S3.62 1 5 1s2.5 1.12 2.5 2.5zM5 8c-1.38 0-2.5 1.12-2.5 2.5v7C2.5 18.88 3.62 20 5 20s2.5-1.12 2.5-2.5v-7C7.5 9.12 6.38 8 5 8zm14 0c-1.38 0-2.5 1.12-2.5 2.5v7c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5v-7c0-1.38-1.12-2.5-2.5-2.5zm0-6c1.38 0 2.5-1.12 2.5-2.5S20.38 1 19 1s-2.5 1.12-2.5 2.5S17.62 2 19 2zM13 8.5h-2v4h2v-4zm0 6h-2v2h2v-2z" fill="currentColor"/>`,
  contributions: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>`,
  repos: `<path d="M4 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4zm0 2h16v14H4V5zm2 2v2h2V7H6zm4 0v2h8V7h-8zm-4 4v2h2v-2H6zm4 0v2h8v-2h-8zm-4 4v2h2v-2H6zm4 0v2h8v-2h-8z" fill="currentColor"/>`,
  followers: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>`,
};

export class GitHubStatsStrategy implements SVGStrategy {
  readonly type = "github-stats";

  generate(data: unknown, username: string, config?: CardConfig): string {
    const stats = data as GitHubStats;
    const themeKey = config?.theme ?? "dark";
    const theme = themeRegistry.get(themeKey);
    const colors = theme.getColors();

    const borderRadius = config?.borderRadius ?? 12;
    const showBorder = config?.showBorder ?? true;
    const borderWidth = config?.borderWidth ?? 2;

    const width = 600;
    const height = 320;
    const padding = 20;
    const cardPadding = 15;

    const statsData = [
      {
        label: "Commits",
        value: formatNumber(stats.totalCommits),
        icon: "commits",
        color: colors.primaryColor,
      },
      {
        label: "Pull Requests",
        value: formatNumber(stats.totalPullRequests),
        icon: "pullRequests",
        color: colors.secondaryColor,
      },
      {
        label: "Contribuições",
        value: formatNumber(stats.totalContributions),
        icon: "contributions",
        color: colors.accentGradient[0],
      },
      {
        label: "Repositórios",
        value: stats.publicRepos.toString(),
        icon: "repos",
        color: colors.accentGradient[1],
      },
    ];

    return `<svg width="${config?.width ?? width}" height="${config?.height ?? height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${colors.bgGradient[0]};stop-opacity:1" />
    <stop offset="100%" style="stop-color:${colors.bgGradient[1]};stop-opacity:1" />
  </linearGradient>
  <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:${colors.accentGradient[0]};stop-opacity:1" />
    <stop offset="100%" style="stop-color:${colors.accentGradient[1]};stop-opacity:1" />
  </linearGradient>
  <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:${colors.primaryColor};stop-opacity:0.3">
      <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/>
    </stop>
    <stop offset="50%" style="stop-color:${colors.secondaryColor};stop-opacity:0.5">
      <animate attributeName="offset" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
    </stop>
    <stop offset="100%" style="stop-color:${colors.primaryColor};stop-opacity:0.3">
      <animate attributeName="offset" values="1;0;1" dur="3s" repeatCount="indefinite"/>
    </stop>
  </linearGradient>
  <filter id="glow">
    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>

<rect width="${width}" height="${height}" rx="${borderRadius}" fill="url(#bgGrad)"/>

${showBorder ? `<rect x="${borderWidth / 2}" y="${borderWidth / 2}" width="${width - borderWidth}" height="${height - borderWidth}" rx="${borderRadius - 1}" fill="none" stroke="${colors.borderColor}" stroke-width="${borderWidth}" filter="url(#glow)"/>` : ""}

<rect x="0" y="0" width="${width}" height="4" fill="url(#shimmer)" rx="${borderRadius}" />

<rect x="${padding}" y="${padding}" width="${width - padding * 2}" height="60" rx="8" fill="${colors.cardBg}" opacity="0.6"/>
<rect x="${padding}" y="${padding}" width="6" height="60" rx="3" fill="url(#accentGrad)"/>
<text x="${padding + 20}" y="${padding + 28}" font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="22" font-weight="700" fill="${colors.primaryColor}">${escapeXml(username)}</text>
<text x="${padding + 20}" y="${padding + 50}" font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="13" fill="${colors.textColor}" opacity="0.7">GitHub Statistics</text>
<circle cx="${width - padding - 25}" cy="${padding + 30}" r="6" fill="${colors.accentGradient[0]}">
  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
</circle>

${statsData
  .map((stat, statIndex) => {
    const rowIndex = Math.floor(statIndex / 2);
    const columnIndex = statIndex % 2;
    const cardWidth = (width - padding * 3 - 10) / 2;
    const cardHeight = 90;
    const positionX = padding + columnIndex * (cardWidth + 10);
    const positionY = 100 + rowIndex * (cardHeight + 10);

    return `<g>
    <rect x="${positionX}" y="${positionY}" width="${cardWidth}" height="${cardHeight}" rx="10" fill="${colors.cardBg}" stroke="${colors.borderColor}" stroke-width="1.5"/>
    <svg x="${positionX + cardPadding}" y="${positionY + cardPadding}" width="24" height="24" viewBox="0 0 24 24">
      <g style="color: ${stat.color}">${icons[stat.icon as keyof typeof icons]}</g>
    </svg>
    <text x="${positionX + cardPadding}" y="${positionY + cardHeight - 30}" font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="28" font-weight="700" fill="${stat.color}">${stat.value}</text>
    <text x="${positionX + cardPadding}" y="${positionY + cardHeight - 12}" font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="12" fill="${colors.textColor}" opacity="0.7">${stat.label}</text>
    <rect x="${positionX}" y="${positionY}" width="4" height="${cardHeight}" rx="10" fill="${stat.color}" opacity="0.6"/>
  </g>`;
  })
  .join("")}

<text x="${width / 2}" y="${height - 12}" text-anchor="middle" font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="10" fill="${colors.textColor}" opacity="0.4">Galeria I.C.L • github-stats</text>
</svg>`;
  }

  generatePreview(theme: string, config?: Partial<CardConfig>): string {
    const mockStats: GitHubStats = {
      totalCommits: 1250,
      totalPullRequests: 85,
      totalContributions: 542,
      followers: 45,
      publicRepos: 24,
    };
    const themeKey = theme as CardConfig["theme"];
    return this.generate(mockStats, "seu-usuario", {
      theme: themeKey,
      ...config,
    });
  }
}

export const githubStatsStrategy = new GitHubStatsStrategy();
