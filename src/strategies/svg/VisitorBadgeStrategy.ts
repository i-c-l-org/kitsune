import type { SVGStrategy } from "@/core/interfaces/ISVGStrategy";
import type { CardConfig } from "@/core/interfaces/IThemeStrategy";
import type { VisitorBadgeStyleOptions } from "@/tipos/visitor";

const VISITOR_BADGE_SVG_BASE = `<?xml version="1.0" encoding="UTF-8"?><svg viewBox="0 0 160 28" xmlns="http://www.w3.org/2000/svg" width="160" height="28" role="img" aria-label="__ARIA_LABEL__"><linearGradient id="g" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-opacity=".12"/></linearGradient><rect width="160" height="28" rx="__RX__" fill="__LABEL_BG__"/><rect x="86" width="74" height="28" rx="__RX__" fill="__VALUE_BG__"/><path fill="__VALUE_BG__" d="M86 0h6v28h-6z"/><rect width="160" height="28" rx="__RX__" fill="url(#g)"/><g fill="__TEXT_COLOR__" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="12"><text x="43" y="19">__LABEL__</text><text x="123" y="19">__VALUE__</text></g></svg>`;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.trunc(value)));
}

function resolveRx(options: VisitorBadgeStyleOptions | undefined): number {
  const defaultRx = 6;

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
      return defaultRx;
  }
}

export class VisitorBadgeStrategy implements SVGStrategy {
  readonly type = "visitor-badge";

  generate(data: unknown, _username: string, _config?: CardConfig): string {
    const { label, value, options } = data as {
      label: string;
      value: string;
      options?: VisitorBadgeStyleOptions;
    };

    const safeLabel = escapeXml(label);
    const safeValue = escapeXml(value);
    const ariaLabel = `${safeLabel}: ${safeValue}`;

    const labelBg = options?.labelBg ?? "#111";
    const valueBg = options?.valueBg ?? "#222";
    const textColor = options?.textColor ?? "#fff";
    const rx = resolveRx(options);

    return VISITOR_BADGE_SVG_BASE.replace("__ARIA_LABEL__", ariaLabel)
      .replace("__LABEL__", safeLabel)
      .replace("__VALUE__", safeValue)
      .replaceAll("__LABEL_BG__", labelBg)
      .replaceAll("__VALUE_BG__", valueBg)
      .replaceAll("__TEXT_COLOR__", textColor)
      .replaceAll("__RX__", String(rx));
  }

  generatePreview(_theme: string, _config?: Partial<CardConfig>): string {
    return this.generate(
      {
        label: "Visitors",
        value: "1,234",
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

export const visitorBadgeStrategy = new VisitorBadgeStrategy();
