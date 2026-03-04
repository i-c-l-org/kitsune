import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type { CardConfig, ThemeName } from "@/core/interfaces/IThemeStrategy";
import type { GitHubStats } from "@/tipos/github";
import type { SVGStrategyPayload } from "@/tipos/svg-strategy";
import { REGISTRO_DE_TEMAS } from "@/strategies/themes";

function formatNumber(VALOR: number): string {
  if (VALOR >= 1000000) {
    return (VALOR / 1000000).toFixed(1) + "M";
  }
  if (VALOR >= 1000) {
    return (VALOR / 1000).toFixed(1) + "k";
  }
  return VALOR.toString();
}
function escapeXml(VALOR: string): string {
  return VALOR.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
const ICONES = {
  commits: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>`,
  pullRequests: `<path d="M7.5 3.5C7.5 4.88 6.38 6 5 6s-2.5-1.12-2.5-2.5S3.62 1 5 1s2.5 1.12 2.5 2.5zM5 8c-1.38 0-2.5 1.12-2.5 2.5v7C2.5 18.88 3.62 20 5 20s2.5-1.12 2.5-2.5v-7C7.5 9.12 6.38 8 5 8zm14 0c-1.38 0-2.5 1.12-2.5 2.5v7c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5v-7c0-1.38-1.12-2.5-2.5-2.5zm0-6c1.38 0 2.5-1.12 2.5-2.5S20.38 1 19 1s-2.5 1.12-2.5 2.5S17.62 2 19 2zM13 8.5h-2v4h2v-4zm0 6h-2v2h2v-2z"/>`,
  contributions: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
  repos: `<path d="M4 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H4zm0 2h16v14H4V5zm2 2v2h2V7H6zm4 0v2h8V7h-8zm-4 4v2h2v-2H6zm4 0v2h8v-2h-8zm-4 4v2h2v-2H6zm4 0v2h8v-2h-8z"/>`,
  followers: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>`,
};

type StatsIconName = keyof typeof ICONES;

export class GitHubStatsStrategy implements SVGStrategy {
  readonly type = "github-stats";
  generate(
    DADOS: SVGStrategyPayload,
    username: string,
    config?: CardConfig,
  ): string {
    const ESTATISTICAS = DADOS as GitHubStats;
    const CHAVE_TEMA = (config?.theme ?? config?.TEMA ?? "dark") as ThemeName;
    const TEMA = REGISTRO_DE_TEMAS.get(CHAVE_TEMA);
    const CORES = TEMA.getColors();
    const RAIOS_BORDA = config?.RAIOS_BORDA ?? 12;
    const MOSTRAR_BORDA = config?.MOSTRAR_BORDA ?? true;
    const LARGURA_BORDA = config?.LARGURA_BORDA ?? 2;
    const LARGURA = 600;
    const ALTURA = 320;
    const PADDING = 20;
    const PADDING_CARTAO = 15;
    const GITHUB_COMPAT = config?.COMPAT_GITHUB === true;
    const DADOS_ESTATISTICAS = [
      {
        label: "Commits",
        VALOR: formatNumber(ESTATISTICAS.TOTAL_COMMITS),
        icon: "commits" as StatsIconName,
        color: CORES.primaryColor,
      },
      {
        label: "Pull Requests",
        VALOR: formatNumber(ESTATISTICAS.totalPullRequests),
        icon: "pullRequests" as StatsIconName,
        color: CORES.secondaryColor,
      },
      {
        label: "Contribuições",
        VALOR: formatNumber(ESTATISTICAS.totalContributions),
        icon: "contributions" as StatsIconName,
        color: CORES.accentGradient[0],
      },
      {
        label: "Repositórios",
        VALOR: ESTATISTICAS.publicRepos.toString(),
        icon: "repos" as StatsIconName,
        color: CORES.accentGradient[1],
      },
    ];
    const SHIMMER_GRADIENT = GITHUB_COMPAT
      ? `<linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${CORES.primaryColor};stop-opacity:0.3" /><stop offset="50%" style="stop-color:${CORES.secondaryColor};stop-opacity:0.5" /><stop offset="100%" style="stop-color:${CORES.primaryColor};stop-opacity:0.3" /></linearGradient>`
      : `<linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${CORES.primaryColor};stop-opacity:0.3"><animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/></stop><stop offset="50%" style="stop-color:${CORES.secondaryColor};stop-opacity:0.5"><animate attributeName="offset" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></stop><stop offset="100%" style="stop-color:${CORES.primaryColor};stop-opacity:0.3"><animate attributeName="offset" values="1;0;1" dur="3s" repeatCount="indefinite"/></stop></linearGradient>`;

    return `<svg width="${config?.LARGURA ?? LARGURA}" height="${config?.ALTURA ?? ALTURA}" viewBox="0 0 ${LARGURA} ${ALTURA}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${CORES.bgGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${CORES.bgGradient[1]};stop-opacity:1" /></linearGradient><linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${CORES.accentGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${CORES.accentGradient[1]};stop-opacity:1" /></linearGradient>
  ${SHIMMER_GRADIENT}
  <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="${LARGURA}" height="${ALTURA}" rx="${RAIOS_BORDA}" fill="url(#bgGrad)"/>

${MOSTRAR_BORDA ? `<rect x="${LARGURA_BORDA / 2}" y="${LARGURA_BORDA / 2}" width="${LARGURA - LARGURA_BORDA}" height="${ALTURA - LARGURA_BORDA}" rx="${RAIOS_BORDA - 1}" fill="none" stroke="${CORES.borderColor}" stroke-width="${LARGURA_BORDA}"${GITHUB_COMPAT ? "" : ' filter="url(#glow)"'}/>` : ""}

<rect x="0" y="0" width="${LARGURA}" height="4" fill="url(#shimmer)" rx="${RAIOS_BORDA}" /><rect x="${PADDING}" y="${PADDING}" width="${LARGURA - PADDING * 2}" height="60" rx="8" fill="${CORES.cardBg}" opacity="0.6"/><rect x="${PADDING}" y="${PADDING}" width="6" height="60" rx="3" fill="url(#accentGrad)"/><text x="${PADDING + 20}" y="${PADDING + 28}" font-family="Verdana,DejaVu Sans,sans-serif" font-size="22" font-weight="700" fill="${CORES.primaryColor}">${escapeXml(username)}</text><text x="${PADDING + 20}" y="${PADDING + 50}" font-family="Verdana,DejaVu Sans,sans-serif" font-size="13" fill="${CORES.COR_TEXTO}" opacity="0.7">GitHub Statistics</text><circle cx="${LARGURA - PADDING - 25}" cy="${PADDING + 30}" r="6" fill="${CORES.accentGradient[0]}"${GITHUB_COMPAT ? ' opacity="0.9"' : ""}>
  ${
    GITHUB_COMPAT
      ? ""
      : `
  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
  `
  }
</circle>

${DADOS_ESTATISTICAS.map((stat, statIndex) => {
  const INDICE_LINHA = Math.floor(statIndex / 2);
  const INDICE_COLUNA = statIndex % 2;
  const LARGURA_CARTAO = (LARGURA - PADDING * 3 - 10) / 2;
  const ALTURA_CARTAO = 90;
  const POSICAO_X = PADDING + INDICE_COLUNA * (LARGURA_CARTAO + 10);
  const POSICAO_Y = 100 + INDICE_LINHA * (ALTURA_CARTAO + 10);
  return `<g><rect x="${POSICAO_X}" y="${POSICAO_Y}" width="${LARGURA_CARTAO}" height="${ALTURA_CARTAO}" rx="10" fill="${CORES.cardBg}" stroke="${CORES.borderColor}" stroke-width="1.5"/><g transform="translate(${POSICAO_X + PADDING_CARTAO}, ${POSICAO_Y + PADDING_CARTAO}) scale(1)" fill="${stat.color}">
      ${ICONES[stat.icon]}
    </g><text x="${POSICAO_X + PADDING_CARTAO}" y="${POSICAO_Y + ALTURA_CARTAO - 30}" font-family="Verdana,DejaVu Sans,sans-serif" font-size="28" font-weight="700" fill="${stat.color}">${stat.VALOR}</text><text x="${POSICAO_X + PADDING_CARTAO}" y="${POSICAO_Y + ALTURA_CARTAO - 12}" font-family="Verdana,DejaVu Sans,sans-serif" font-size="12" fill="${CORES.COR_TEXTO}" opacity="0.7">${stat.label}</text><rect x="${POSICAO_X}" y="${POSICAO_Y}" width="4" height="${ALTURA_CARTAO}" rx="10" fill="${stat.color}" opacity="0.6"/></g>`;
}).join("")}

<text x="${LARGURA / 2}" y="${ALTURA - 12}" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="10" fill="${CORES.COR_TEXTO}" opacity="0.4">Galeria I.C.L • github-stats</text></svg>`;
  }
  generatePreview(TEMA: string, config?: Partial<CardConfig>): string {
    const ESTATISTICAS_MOCK: GitHubStats = {
      TOTAL_COMMITS: 1250,
      totalPullRequests: 85,
      totalContributions: 542,
      followers: 45,
      publicRepos: 24,
    };
    const CHAVE_TEMA = TEMA as CardConfig["theme"];
    return this.generate(ESTATISTICAS_MOCK, "seu-usuario", {
      theme: CHAVE_TEMA,
      ...config,
    });
  }
}
export const ESTRATEGIA_ESTATISTICAS_GITHUB = new GitHubStatsStrategy();
