import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type { CardConfig, ThemeName } from "@/core/interfaces/IThemeStrategy";
import type { StatusBadgeTheme } from "@/tipos/statusBadge";
import type { SVGStrategyPayload } from "@/tipos/svg-strategy";
const TEMAS: Record<string, StatusBadgeTheme> = {
  ocean: {
    bgGradient: ["#0F2027", "#203A43"],
    cardBg: "rgba(15, 32, 39, 0.95)",
    primaryColor: "#4FC3F7",
    secondaryColor: "#81D4FA",
    COR_TEXTO: "#E1F5FE",
    accentGradient: ["#00B4DB", "#0083B0"],
    borderColor: "rgba(79, 195, 247, 0.3)",
  },
  sunset: {
    bgGradient: ["#FF512F", "#DD2476"],
    cardBg: "rgba(221, 36, 118, 0.95)",
    primaryColor: "#FFB347",
    secondaryColor: "#FFCC33",
    COR_TEXTO: "#FFF3E0",
    accentGradient: ["#FF6B6B", "#FFE66D"],
    borderColor: "rgba(255, 179, 71, 0.3)",
  },
  forest: {
    bgGradient: ["#134E5E", "#71B280"],
    cardBg: "rgba(19, 78, 94, 0.95)",
    primaryColor: "#81C784",
    secondaryColor: "#A5D6A7",
    COR_TEXTO: "#E8F5E9",
    accentGradient: ["#56AB2F", "#A8E063"],
    borderColor: "rgba(129, 199, 132, 0.3)",
  },
  purple: {
    bgGradient: ["#360033", "#0b8793"],
    cardBg: "rgba(54, 0, 51, 0.95)",
    primaryColor: "#BA68C8",
    secondaryColor: "#CE93D8",
    COR_TEXTO: "#F3E5F5",
    accentGradient: ["#8E2DE2", "#4A00E0"],
    borderColor: "rgba(186, 104, 200, 0.3)",
  },
  dark: {
    bgGradient: ["#0F0F0F", "#1A1A1A"],
    cardBg: "rgba(26, 26, 26, 0.95)",
    primaryColor: "#BB86FC",
    secondaryColor: "#03DAC6",
    COR_TEXTO: "#E1E1E1",
    accentGradient: ["#BB86FC", "#3700B3"],
    borderColor: "rgba(187, 134, 252, 0.3)",
  },
  neon: {
    bgGradient: ["#0A0E27", "#1C1F3B"],
    cardBg: "rgba(28, 31, 59, 0.95)",
    primaryColor: "#00FFF0",
    secondaryColor: "#FF00FF",
    COR_TEXTO: "#FFFFFF",
    accentGradient: ["#00FFF0", "#FF00FF"],
    borderColor: "rgba(0, 255, 240, 0.3)",
  },
};
const TEMA_PADRAO: StatusBadgeTheme = {
  bgGradient: ["#0F2027", "#203A43"],
  cardBg: "rgba(15, 32, 39, 0.95)",
  primaryColor: "#4FC3F7",
  secondaryColor: "#81D4FA",
  COR_TEXTO: "#E1F5FE",
  accentGradient: ["#00B4DB", "#0083B0"],
  borderColor: "rgba(79, 195, 247, 0.3)",
};
function getTheme(CHAVE_TEMA: string): StatusBadgeTheme {
  const TEMA_SELECIONADO = TEMAS[CHAVE_TEMA];
  if (TEMA_SELECIONADO !== undefined) {
    return TEMA_SELECIONADO;
  }
  return TEMA_PADRAO;
}
export class StatusBadgeStrategy implements SVGStrategy {
  readonly type = "status-badge";
  generate(
    DADOS: SVGStrategyPayload,
    _username: string,
    config?: CardConfig,
  ): string {
    const variant =
      typeof DADOS === "object" &&
      DADOS !== null &&
      "variant" in DADOS &&
      typeof DADOS.variant === "string"
        ? DADOS.variant
        : undefined;
    const CHAVE_TEMA = (config?.theme ?? config?.TEMA ?? "ocean") as ThemeName;
    const TEMA = getTheme(CHAVE_TEMA);
    const ESTATISTICAS = {
      files: "380+",
      lines: "25K+",
      COMMITS: "500+",
      stars: "⭐",
    };
    const TITULO = variant === "minimal" ? "Status" : "Project Status";
    const MOSTRAR_ESTATISTICAS = variant !== "minimal";
    const ALTURA = MOSTRAR_ESTATISTICAS ? 180 : 120;
    return `<svg width="400" height="${ALTURA}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${TEMA.bgGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${TEMA.bgGradient[1]};stop-opacity:1" /></linearGradient><linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${TEMA.accentGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${TEMA.accentGradient[1]};stop-opacity:1" /></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${TEMA.primaryColor};stop-opacity:0.3"><animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite"/></stop><stop offset="50%" style="stop-color:${TEMA.secondaryColor};stop-opacity:0.5"><animate attributeName="offset" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></stop><stop offset="100%" style="stop-color:${TEMA.primaryColor};stop-opacity:0.3"><animate attributeName="offset" values="1;0;1" dur="3s" repeatCount="indefinite"/></stop></linearGradient></defs><rect width="400" height="${ALTURA}" rx="12" fill="url(#bgGrad)"/><rect x="1" y="1" width="398" height="${ALTURA - 2}" rx="11"
        fill="none" stroke="${TEMA.borderColor}" stroke-width="2" filter="url(#glow)"/><rect x="0" y="0" width="400" height="4" fill="url(#shimmer)"/><rect x="15" y="15" width="370" height="${ALTURA - 30}" rx="8"
        fill="${TEMA.cardBg}" stroke="${TEMA.borderColor}" stroke-width="1"/><rect x="15" y="15" width="6" height="${ALTURA - 30}" rx="3" fill="url(#accentGrad)"/><text x="35" y="40" font-family="'Segoe UI', Ubuntu, Arial, sans-serif"
        font-size="18" font-weight="700" fill="${TEMA.primaryColor}">${TITULO}</text><circle cx="360" cy="33" r="6" fill="${TEMA.secondaryColor}"><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/></circle>

  ${
    MOSTRAR_ESTATISTICAS
      ? `
  
  <line x1="35" y1="55" x2="365" y2="55" stroke="${TEMA.borderColor}" stroke-width="1" opacity="0.5"/><g font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="12"><text x="35" y="78" fill="${TEMA.COR_TEXTO}" opacity="0.7">Arquivos</text><text x="120" y="78" font-weight="600" fill="${TEMA.primaryColor}">${ESTATISTICAS.files}</text><text x="215" y="78" fill="${TEMA.COR_TEXTO}" opacity="0.7">Linhas</text><text x="285" y="78" font-weight="600" fill="${TEMA.primaryColor}">${ESTATISTICAS.lines}</text><text x="35" y="105" fill="${TEMA.COR_TEXTO}" opacity="0.7">Commits</text><text x="120" y="105" font-weight="600" fill="${TEMA.primaryColor}">${ESTATISTICAS.COMMITS}</text><text x="215" y="105" fill="${TEMA.COR_TEXTO}" opacity="0.7">Status</text><text x="285" y="105" font-weight="600" fill="${TEMA.secondaryColor}">Online</text></g><g font-family="'Segoe UI', Ubuntu, Arial, sans-serif" font-size="10"><rect x="35" y="125" width="55" height="20" rx="10" fill="${TEMA.primaryColor}" opacity="0.2"/><text x="62.5" y="138" text-anchor="middle" fill="${TEMA.primaryColor}" font-weight="600">Next.js</text><rect x="100" y="125" width="50" height="20" rx="10" fill="${TEMA.secondaryColor}" opacity="0.2"/><text x="125" y="138" text-anchor="middle" fill="${TEMA.secondaryColor}" font-weight="600">React</text><rect x="160" y="125" width="65" height="20" rx="10" fill="url(#accentGrad)" opacity="0.2"/><text x="192.5" y="138" text-anchor="middle" fill="${TEMA.COR_TEXTO}" font-weight="600">TypeScript</text></g>
  `
      : ""
  }

  
  <text x="200" y="${ALTURA - 10}" text-anchor="middle"
        font-family="'Segoe UI', Ubuntu, Arial, sans-serif"
        font-size="9" fill="${TEMA.COR_TEXTO}" opacity="0.4">
    Galeria I.C.L
  </text></svg>`;
  }
  generatePreview(_theme: string, config?: Partial<CardConfig>): string {
    const CHAVE_TEMA = (config?.theme ??
      config?.TEMA ??
      "ocean") as CardConfig["theme"];
    return this.generate(
      {
        variant: "default",
      },
      "preview",
      {
        theme: CHAVE_TEMA,
        ...config,
      },
    );
  }
}
export const ESTRATEGIA_BADGE_STATUS = new StatusBadgeStrategy();
