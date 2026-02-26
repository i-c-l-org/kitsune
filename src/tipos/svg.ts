/**
 * Tipos auxiliares para manipulação de SVGs
 */

export type FitMode = 'fill' | 'cover' | 'contain';

export interface CacheEntry {
  content: string;
  mtimeMs: number;
}
