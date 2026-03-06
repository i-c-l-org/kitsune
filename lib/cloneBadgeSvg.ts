import {
  BASE_SVG_BADGE_VISITANTE,
  BASE_SVG_BADGE_COMBINED,
} from '@/services/visitors/visitorBadgeBase';
import type {
  VisitorBadgeShape,
  VisitorBadgeStyleOptions,
  VisitorGradient,
} from '@/tipos/visitor';

export type { VisitorBadgeShape, VisitorBadgeStyleOptions };

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
  gradient: VisitorGradient | undefined,
  id: string,
): string {
  if (!gradient) return '';

  const direction = gradient.direction ?? 0;

  return `<defs>
    <linearGradient id="${id}" x1="0%" y1="0%" x2="${direction === 90 ? '100' : '0'}%" y2="${direction === 90 ? '0' : '100'}%">
      <stop offset="0%" stop-color="${gradient.start}"/>
      <stop offset="100%" stop-color="${gradient.end}"/>
    </linearGradient>
  </defs>`;
}

function resolveBg(
  options: VisitorBadgeStyleOptions | undefined,
  gradientId: string,
  defaultColor: string,
): string {
  if (options?.gradient?.value) {
    return `url(#${gradientId})`;
  }
  return options?.valueBg ?? defaultColor;
}

export function renderCloneBadgeSvg(
  label: string,
  value: string,
  options?: VisitorBadgeStyleOptions,
): string {
  const safeLabel = escapeXml(label);
  const safeValue = escapeXml(value);

  const ariaLabel = `${safeLabel}: ${safeValue}`;

  const labelBg = options?.labelBg ?? '#0f172a';
  const valueBg = resolveBg(options, 'cloneGrad', '#1d4ed8');
  const textColor = options?.textColor ?? '#ffffff';
  const rx = resolveRx(options);

  const gradientId = `g${Math.random().toString(36).substring(2, 8)}`;
  const defs = buildGradientDefs(options?.gradient?.value, gradientId);

  return BASE_SVG_BADGE_VISITANTE.replace('__ARIA_LABEL__', ariaLabel)
    .replace('__LABEL__', safeLabel)
    .replace('__VALUE__', safeValue)
    .replaceAll('__LABEL_BG__', labelBg)
    .replaceAll(
      '__VALUE_BG__',
      options?.gradient?.value ? `url(#${gradientId})` : valueBg,
    )
    .replaceAll('__TEXT_COLOR__', textColor)
    .replaceAll('__RX__', String(rx))
    .replace('__DEFS__', defs);
}

export function renderCombinedBadgeSvg(
  clonesValue: string,
  uniqueVisitsValue: string,
  options?: VisitorBadgeStyleOptions,
): string {
  const safeClonesValue = escapeXml(clonesValue);
  const safeUniqueVisitsValue = escapeXml(uniqueVisitsValue);

  const ariaLabel = `clones: ${safeClonesValue}, unique visits: ${safeUniqueVisitsValue}`;

  const labelBg = options?.labelBg ?? '#0f172a';
  const valueBg = options?.valueBg ?? '#1d4ed8';
  const textColor = options?.textColor ?? '#ffffff';
  const rx = resolveRx(options);

  return BASE_SVG_BADGE_COMBINED.replace('__ARIA_LABEL__', ariaLabel)
    .replace('__CLONES_VALUE__', safeClonesValue)
    .replace('__UNIQUE_VISITS_VALUE__', safeUniqueVisitsValue)
    .replaceAll('__LABEL_BG__', labelBg)
    .replaceAll('__VALUE_BG__', valueBg)
    .replaceAll('__TEXT_COLOR__', textColor)
    .replaceAll('__RX__', String(rx));
}