import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type { CardConfig } from "@/core/interfaces/IThemeStrategy";
import type { VisitorBadgeStyleOptions } from "@/tipos/visitor";
import type { SVGStrategyPayload } from "@/tipos/svg-strategy";
const BASE_SVG_BADGE_VISITANTE = `<?xml version="1.0" encoding="UTF-8"?><svg viewBox="0 0 160 28" xmlns="http://www.w3.org/2000/svg" width="160" height="28" role="img" aria-label="__ARIA_LABEL__"><linearGradient id="g" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-opacity=".12"/></linearGradient><rect width="160" height="28" rx="__RX__" fill="__LABEL_BG__"/><rect x="86" width="74" height="28" rx="__RX__" fill="__VALUE_BG__"/><path fill="__VALUE_BG__" d="M86 0h6v28h-6z"/><rect width="160" height="28" rx="__RX__" fill="url(#g)"/><g fill="__TEXT_COLOR__" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="12"><text x="43" y="19">__LABEL__</text><text x="123" y="19">__VALUE__</text></g></svg>`;
function escapeXml(VALOR: string): string {
  return VALOR.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
function clampInt(VALOR: number, min: number, max: number): number {
  if (!Number.isFinite(VALOR)) return min;
  return Math.max(min, Math.min(max, Math.trunc(VALOR)));
}
function resolveRx(options: VisitorBadgeStyleOptions | undefined): number {
  const RX_PADRAO = 6;
  if (options?.rx !== undefined) {
    return clampInt(options.rx, 0, 14);
  }
  switch (options?.shape) {
    case "square":
      return 0;
    case "pill":
      return 14;
    case "rounded":
    default:
      return RX_PADRAO;
  }
}
export class VisitorBadgeStrategy implements SVGStrategy {
  readonly type = "visitor-badge";
  generate(
    DADOS: SVGStrategyPayload,
    _username: string,
    _config?: CardConfig,
  ): string {
    const { label, VALOR, options } = DADOS as {
      label: string;
      VALOR: string;
      options?: VisitorBadgeStyleOptions;
    };
    const ROTULO_SEGURO = escapeXml(label);
    const VALOR_SEGURO = escapeXml(VALOR);
    const ROTULO_ARIA = `${ROTULO_SEGURO}: ${VALOR_SEGURO}`;
    const FUNDO_ROTULO = options?.labelBg ?? "#111";
    const FUNDO_VALOR = options?.valueBg ?? "#222";
    const COR_TEXTO = options?.textColor ?? "#fff";
    const RX = resolveRx(options);
    return BASE_SVG_BADGE_VISITANTE.replace("__ARIA_LABEL__", ROTULO_ARIA)
      .replace("__LABEL__", ROTULO_SEGURO)
      .replace("__VALUE__", VALOR_SEGURO)
      .replaceAll("__LABEL_BG__", FUNDO_ROTULO)
      .replaceAll("__VALUE_BG__", FUNDO_VALOR)
      .replaceAll("__TEXT_COLOR__", COR_TEXTO)
      .replaceAll("__RX__", String(RX));
  }
  generatePreview(_theme: string, _config?: Partial<CardConfig>): string {
    return this.generate(
      {
        label: "Visitors",
        VALOR: "1,234",
        options: {
          labelBg: "#111",
          valueBg: "#222",
          textColor: "#fff",
        },
      },
      "preview-user",
      _config as CardConfig | undefined,
    );
  }
}
export const ESTRATEGIA_BADGE_VISITANTE = new VisitorBadgeStrategy();
