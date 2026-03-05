/**
 * Tipos relacionados aos badges de visitantes
 */

export type VisitorBadgeShape = 'rounded' | 'square' | 'pill';

export interface VisitorGradient {
  start: string;
  end: string;
  direction?: number;
}

export interface VisitorBadgeStyleOptions {
  labelBg?: string;
  valueBg?: string;
  textColor?: string;
  rx?: number;
  shape?: VisitorBadgeShape;
  gradient?: {
    label: VisitorGradient;
    value: VisitorGradient;
  };
}

/**
 * Representa uma variante de badge de visitante na galeria
 */
export interface VisitorVariant {
  id: string;
  title: string;
  alt: string;
  labelForMarkdown: string;
  path?: string;
  query: Record<string, string>;
  previewQuery?: Record<string, string>;
}
