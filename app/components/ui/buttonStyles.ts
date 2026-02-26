import type { Variant, Size } from '@/tipos/ui';

// Classes base para todos os botões, incluindo foco e acessibilidade
export const BUTTON_BASE_CLASSES =
  'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]';

// Classes CSS para cada variante de botão, definindo aparência e comportamentos
export const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-md border border-[var(--accent-tertiary)] bg-[var(--gradient-button)] text-white shadow-[var(--shadow-button)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-button-hover)] transition-[transform,box-shadow] duration-200',
  secondary:
    'inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-[transform,box-shadow,border-color,color,background-color] duration-200 hover:border-[var(--accent-light)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-light)] hover:shadow-[var(--shadow-button)]',
  ghost:
    'inline-flex items-center justify-center gap-2 rounded-md bg-transparent text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--accent-light)]',
};

export const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export function getButtonClasses(
  variant: Variant = 'secondary',
  size: Size = 'md',
  className = '',
): string {
  return [
    BUTTON_BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}
