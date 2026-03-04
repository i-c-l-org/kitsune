import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type {
  CardConfig,
  ThemeColors,
  ThemeName,
} from "@/core/interfaces/IThemeStrategy";
import type { GitHubLanguageStat } from "@/tipos/github";
import type { SVGStrategyPayload } from "@/tipos/svg-strategy";
import { REGISTRO_DE_TEMAS } from "@/strategies/themes";

function formatPercent(VALOR: number): string {
  return `${VALOR.toFixed(1)}%`;
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
  LINGUAS: GitHubLanguageStat[],
  CORES: ThemeColors,
  LARGURA: number,
): string {
  const INICIO_X = 40;
  const LARGURA_AREA_BAR = Math.max(LARGURA - 220, 140);
  const INICIO_Y = 100;
  const ALTURA_BAR = 26;
  const ESPACO = 12;
  return LINGUAS.map((lang, langIndex) => {
    const POSICAO_Y = INICIO_Y + langIndex * (ALTURA_BAR + ESPACO);
    const LARGURA_BAR = Math.max((lang.PERCENTUAL / 100) * LARGURA_AREA_BAR, 6);
    const NOME_SEGURO = escapeXml(lang.NOME);
    return `<g><rect x="${INICIO_X}" y="${POSICAO_Y}" width="${LARGURA_AREA_BAR}" height="${ALTURA_BAR}" rx="8" fill="${CORES.cardBg}" /><rect x="${INICIO_X}" y="${POSICAO_Y}" width="${LARGURA_BAR}" height="${ALTURA_BAR}" rx="8" fill="${lang.color}" /><text x="${INICIO_X + 12}" y="${POSICAO_Y + 18}" fill="${CORES.COR_TEXTO}" font-size="13" font-weight="600" font-family="Verdana,DejaVu Sans,sans-serif">${NOME_SEGURO}</text><text x="${LARGURA - 120}" y="${POSICAO_Y + 18}" fill="${CORES.COR_TEXTO}" font-size="13" text-anchor="end" font-weight="700" font-family="Verdana,DejaVu Sans,sans-serif">${formatPercent(lang.PERCENTUAL)}</text></g>`;
  }).join("");
}
export class GitHubLangsStrategy implements SVGStrategy {
  readonly type = "github-langs";
  generate(
    DADOS: SVGStrategyPayload,
    username: string,
    config?: CardConfig,
  ): string {
    const LINGUAS = DADOS as GitHubLanguageStat[];
    const CHAVE_TEMA = (config?.theme ?? config?.TEMA ?? "dark") as ThemeName;
    const TEMA = REGISTRO_DE_TEMAS.get(CHAVE_TEMA);
    const CORES = TEMA.getColors();
    const RAIOS_BORDA = config?.RAIOS_BORDA ?? 12;
    const MOSTRAR_BORDA = config?.MOSTRAR_BORDA ?? true;
    const LARGURA_BORDA = config?.LARGURA_BORDA ?? 2;
    const LARGURA_BASE = 600;
    const ALTURA_BASE = 320;
    const LARGURA = Math.max(config?.LARGURA ?? LARGURA_BASE, 360);
    const ALTURA = Math.max(config?.ALTURA ?? ALTURA_BASE, 240);
    const USUARIO_SEGURO = escapeXml(username);
    const ROTULO_TOTAL = "Top 5 linguagens";
    return `<svg width="${LARGURA}" height="${ALTURA}" viewBox="0 0 ${LARGURA} ${ALTURA}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bgLangGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${CORES.bgGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${CORES.bgGradient[1]};stop-opacity:1" /></linearGradient><linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${CORES.accentGradient[0]};stop-opacity:1" /><stop offset="100%" style="stop-color:${CORES.accentGradient[1]};stop-opacity:1" /></linearGradient></defs><rect width="${LARGURA}" height="${ALTURA}" rx="${RAIOS_BORDA}" fill="url(#bgLangGrad)" />
${MOSTRAR_BORDA ? `<rect x="${LARGURA_BORDA / 2}" y="${LARGURA_BORDA / 2}" width="${LARGURA - LARGURA_BORDA}" height="${ALTURA - LARGURA_BORDA}" rx="${RAIOS_BORDA - 1}" fill="none" stroke="${CORES.borderColor}" stroke-width="${LARGURA_BORDA}" />` : ""}

<text x="28" y="44" fill="url(#titleGrad)" font-size="22" font-weight="800" font-family="Verdana,DejaVu Sans,sans-serif">GitHub Top Languages</text><text x="28" y="70" fill="${CORES.COR_TEXTO}" font-size="14" font-family="Verdana,DejaVu Sans,sans-serif">${USUARIO_SEGURO} · ${ROTULO_TOTAL}</text>

${renderBars(LINGUAS, CORES, LARGURA)}

<text x="${LARGURA - 20}" y="${ALTURA - 18}" fill="${CORES.COR_TEXTO}" font-size="11" text-anchor="end" opacity="0.7" font-family="Verdana,DejaVu Sans,sans-serif">Atualização em tempo real</text></svg>`;
  }
  generatePreview(theme: string, config?: Partial<CardConfig>): string {
    const DADOS_MOCK: GitHubLanguageStat[] = [
      {
        NOME: "TypeScript",
        VALOR: 320,
        PERCENTUAL: 32,
        color: "#3178c6",
      },
      {
        NOME: "JavaScript",
        VALOR: 260,
        PERCENTUAL: 26,
        color: "#f1e05a",
      },
      {
        NOME: "Python",
        VALOR: 180,
        PERCENTUAL: 18,
        color: "#3572A5",
      },
      {
        NOME: "Go",
        VALOR: 140,
        PERCENTUAL: 14,
        color: "#00ADD8",
      },
      {
        NOME: "CSS",
        VALOR: 100,
        PERCENTUAL: 10,
        color: "#563d7c",
      },
    ];
    const CHAVE_TEMA = theme as CardConfig["theme"];
    return this.generate(DADOS_MOCK, "seu-usuario", {
      theme: CHAVE_TEMA,
      ...config,
    });
  }
}
export const ESTRATEGIA_LINGUAS_GITHUB = new GitHubLangsStrategy();
