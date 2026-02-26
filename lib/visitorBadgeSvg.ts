import { VISITOR_BADGE_SVG_BASE } from '@/lib/visitorBadgeBase';
import type {
  VisitorBadgeShape,
  VisitorBadgeStyleOptions,
} from '@/tipos/visitor';

// Re-export para manter compatibilidade
export type { VisitorBadgeShape, VisitorBadgeStyleOptions };

/**
 * Escapa caracteres especiais XML/HTML para uso seguro em SVG
 * @param value - Texto a ser escapado
 * @returns Texto com caracteres especiais escapados
 */
function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
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
    case 'square':
      return 0;
    case 'pill':
      return 14;
    case 'rounded':
    default:
      return defaultRx;
  }
}

export function renderVisitorBadgeSvg(
  label: string,
  value: string,
  options?: VisitorBadgeStyleOptions,
): string {
  // Badge simples (estilo “flat”) sem depender de libs.
  // Medidas fixas para manter previsibilidade no GitHub README.
  const safeLabel = escapeXml(label);
  const safeValue = escapeXml(value);

  const ariaLabel = `${safeLabel}: ${safeValue}`;

  const labelBg = options?.labelBg ?? '#111';
  const valueBg = options?.valueBg ?? '#222';
  const textColor = options?.textColor ?? '#fff';
  const rx = resolveRx(options);

  return VISITOR_BADGE_SVG_BASE.replace('__ARIA_LABEL__', ariaLabel)
    .replace('__LABEL__', safeLabel)
    .replace('__VALUE__', safeValue)
    .replaceAll('__LABEL_BG__', labelBg)
    .replaceAll('__VALUE_BG__', valueBg)
    .replaceAll('__TEXT_COLOR__', textColor)
    .replaceAll('__RX__', String(rx));
}
