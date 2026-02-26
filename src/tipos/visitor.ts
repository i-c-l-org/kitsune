/**
 * Tipos relacionados aos badges de visitantes
 */

export type VisitorBadgeShape = 'rounded' | 'square' | 'pill';

export interface VisitorBadgeStyleOptions {
  labelBg?: string;
  valueBg?: string;
  textColor?: string;
  rx?: number;
  shape?: VisitorBadgeShape;
}

/**
 * Representa uma variante de badge de visitante na galeria
 */
export interface VisitorVariant {
  id: string;
  title: string;
  alt: string;
  labelForMarkdown: string;
  query: Record<string, string>;
  previewQuery?: Record<string, string>;
}
