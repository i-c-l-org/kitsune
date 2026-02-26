import React from 'react';
import type { BadgeProps, BadgeTone } from '@/tipos/ui';

const TONE_CLASSES: Record<BadgeTone, string> = {
  default:
    'rounded border border-[rgb(13_148_136_/_35%)] bg-[rgb(13_148_136_/_16%)] px-3 py-1 text-[0.85rem] font-medium text-[var(--accent-light)] shadow-[var(--shadow-md)]',
  info: 'rounded bg-[color-mix(in_srgb,var(--accent-tertiary)_18%,transparent)] px-3 py-1 text-[0.85rem] font-semibold text-[var(--accent-light)]',
  muted:
    'rounded bg-[var(--bg-secondary)] px-3 py-1 text-[0.85rem] text-[var(--text-secondary)]',
  accent:
    'rounded bg-[var(--gradient-hero)] px-3 py-1 text-[0.85rem] font-semibold text-black shadow-[var(--shadow-md)]',
};

export default function Badge({
  tone = 'default',
  className = '',
  children,
  ...props
}: BadgeProps): React.ReactElement {
  const classes = [TONE_CLASSES[tone], className].filter(Boolean).join(' ');
  return (
    <span {...props} className={classes}>
      {children}
    </span>
  );
}
