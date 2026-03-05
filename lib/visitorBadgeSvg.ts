import { BASE_SVG_BADGE_VISITANTE } from '@/services/visitors/visitorBadgeBase';
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

function buildGradientDefs(
  gradient: VisitorBadgeStyleOptions['gradient'],
  id: string,
): string {
  if (!gradient) return '';

  const valueDir = gradient.value.direction ?? 0;

  return `<defs>
    <linearGradient id="${id}-label" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${gradient.label.start}"/>
      <stop offset="100%" stop-color="${gradient.label.end}"/>
    </linearGradient>
    <linearGradient id="${id}-value" x1="0%" y1="0%" x2="${valueDir === 90 ? '100' : '0'}%" y2="${valueDir === 90 ? '0' : '100'}%">
      <stop offset="0%" stop-color="${gradient.value.start}"/>
      <stop offset="100%" stop-color="${gradient.value.end}"/>
    </linearGradient>
  </defs>`;
}

function resolveLabelBg(
  options: VisitorBadgeStyleOptions | undefined,
  gradientId: string,
): string {
  if (options?.gradient?.label) {
    return `url(#${gradientId}-label)`;
  }
  return options?.labelBg ?? '#111';
}

function resolveValueBg(
  options: VisitorBadgeStyleOptions | undefined,
  gradientId: string,
): string {
  if (options?.gradient?.value) {
    return `url(#${gradientId}-value)`;
  }
  return options?.valueBg ?? '#222';
}

export function renderVisitorBadgeSvg(
  label: string,
  value: string,
  options?: VisitorBadgeStyleOptions,
): string {
  const safeLabel = escapeXml(label);
  const safeValue = escapeXml(value);

  const ariaLabel = `${safeLabel}: ${safeValue}`;

  const textColor = options?.textColor ?? '#fff';
  const rx = resolveRx(options);

  const gradientId = `g${Math.random().toString(36).substring(2, 8)}`;
  const defs = buildGradientDefs(options?.gradient, gradientId);
  const labelBg = resolveLabelBg(options, gradientId);
  const valueBg = resolveValueBg(options, gradientId);

  return BASE_SVG_BADGE_VISITANTE.replace('__ARIA_LABEL__', ariaLabel)
    .replace('__LABEL__', safeLabel)
    .replace('__VALUE__', safeValue)
    .replaceAll('__LABEL_BG__', labelBg)
    .replaceAll('__VALUE_BG__', valueBg)
    .replaceAll('__TEXT_COLOR__', textColor)
    .replaceAll('__RX__', String(rx))
    .replace('__DEFS__', defs);
}
