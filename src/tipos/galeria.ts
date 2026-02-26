/**
 * Tipos relacionados à galeria de SVGs
 */

export type CategoryType =
  | 'banner'
  | 'skills'
  | 'decorativos'
  | 'info'
  | 'social'
  | 'langs'
  | 'ferramentas'
  | 'tecnologias'
  | 'visitors';

export type GalleryRouteSlug =
  | ''
  | 'banners'
  | 'skills'
  | 'social'
  | 'langs'
  | 'ferramentas'
  | 'tecnologias'
  | 'decorativos'
  | 'info'
  | 'visitors';

export interface SVGItem {
  id: string;
  title: string;
  filename: string;
  alt: string;
  category: CategoryType;
}

export interface CategoryInfo {
  title: string;
  icon: string;
  description: string;
}

export interface GalleryCategory {
  slug: GalleryRouteSlug;
  label: string;
  icon: string;
  count?: number;
}

export interface GalleryGridProps {
  items: SVGItem[];
  title?: string;
  icon?: string;
  description?: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
