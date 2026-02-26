import React from 'react';
import type { FeatureItemProps } from '@/tipos/ui';

export default function FeatureItem({
  children,
  className = '',
  icon,
  ...props
}: FeatureItemProps): React.ReactElement {
  const base =
    'featureItem flex items-center gap-4 rounded border border-[var(--vscode-border)] bg-[var(--vscode-sidebar)] p-4 text-[1.05rem] leading-relaxed text-[var(--text-primary)] transition-all hover:translate-x-2 hover:border-[var(--accent-blue)] hover:bg-[var(--vscode-hover)]';
  return (
    <li {...props} className={`${base} ${className}`.trim()}>
      <span className="flex size-10 flex-shrink-0 items-center justify-center rounded bg-[var(--accent-blue)] text-[1.1rem] font-semibold text-[var(--text-bright)]">
        {icon}
      </span>
      {children}
    </li>
  );
}
